require('mongoose').model('summary');
var map = require('array-map');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var Summary = require('../models/summary');
var Stages = require('../models/stage');
var Expenditures = require('../models/expenditure');
var Status = require('../models/status');
var TurnArounds = require('../models/turnaround');
var Insights = require('../models/insight');
var Spotlights = require('../models/spotlight');
var Actions = require('../models/action');
var Influencers = require('../models/influencer');
var Impacts = require('../models/impact');
var Genders = require('../models/gender');
var Sentiments = require('../models/sentiment');
var Impressions = require('../models/impression');
var Mapheaderfooters = require('../models/mapheaderfooter');
var Feedbackpulses = require('../models/feedbackpulse');
var Schemes = require('../models/schemes');
var assert = require('assert');


//expenditure
router.get("/expenditure/aggregate", (req, res, next) => {
    var segment = parseInt(req.query.segment);
    var options = [
        {
            $group: { _id: "$stage", expenditure: { $sum: "$expenditure" } }
        },
        {
            $sort: {
                "_id": 1
            }
        },
        {
            $project: {
                label:
                {
                    $concat: [
                        "Stage ", {
                            $substr:
                            ["$_id", 0, -1]
                        }]
                },
                value: "$expenditure",
                _id: 0,
            }
        }];
    if (segment) {
        options.splice(0, 0, {
            $match: { segment: segment }
        });
    }
    Expenditures.aggregate(options, (err, docs) => {
        var response = {
            title: "Expenditure",
            data: [
                {
                    key: "Expenditure",
                    values: docs
                }
            ]
        };
        res.json(response);
    });
});


//turn around time
router.get("/turnaroundtime/aggregate", (req, res, next) => {
    var segment = parseInt(req.query.segment);
    var options = [
        {
            $group: { _id: "$stage", turnaroundtime: { $avg: "$turnaroundtime" } }
        },
        {
            $sort: {
                "_id": 1
            }
        },
        {
            $project: {
                label:
                {
                    $concat: [
                        "Stage ", {
                            $substr:
                            ["$_id", 0, -1]
                        }]
                },
                value: "$turnaroundtime",
                _id: 0,
            }
        }];
    if (segment) {
        options.splice(0, 0, {
            $match: { segment: segment }
        });
    }
    TurnArounds.aggregate(options, (err, docs) => {
        var response = {
            title: "Turnaround Time",
            data: [
                {
                    key: "Turnaround Time",
                    values: docs
                }
            ]
        };
        res.json(response);
    });
});


//spotlight
router.get("/spotlight/aggregate", (req, res, next) => {
    var segment = parseInt(req.query.segment);
    var options = [
        {
            $project: {
                title: 1,
                link: 1,
                image: 1,
                _id: 0
            }
        }
    ];
    if (segment) {
        options.splice(0, 0, {
            $match: { segment: segment }
        });
    }
    Spotlights.aggregate(options, (err, docs) => {
        res.json(docs);
    });
});


//insights
router.get("/insight/aggregate", (req, res, next) => {
    var segment = parseInt(req.query.segment);
    var options = [
        {
            $project:
            {
                insights: 1,
                _id: 0
            }
        }];
    if (segment) {
        options.splice(0, 0, {
            $match: { segment: segment }
        });
    }
    Insights.aggregate(options, (err, docs) => {
        var temp = map(docs, function (c) {
            return c.insights;
        });
        var response = {
            insight: temp
        };
        res.json(response);
    });
});


//actions
router.get("/action/aggregate", (req, res, next) => {
    var segment = parseInt(req.query.segment);
    var options = [
        {
            $project:
            {
                actions: 1,
                _id: 0
            }
        }];
    if (segment) {
        options.splice(0, 0, {
            $match: { segment: segment }
        });
    }
    Actions.aggregate(options, (err, docs) => {
        var temp = map(docs, function (c) {
            return c.actions;
        });
        var response = {
            action: temp
        };
        res.json(response);
    });
});


//influencers
router.get("/influencer/aggregate", (req, res, next) => {
    Influencers.find({}, { _id: 0 }, (err, docs) => {
        var response = {
            title: "KPI Influencer",
            data: docs
        }
        res.json(response);
    });
});


//impacts
router.get("/impact/aggregate", (req, res, next) => {
    Impacts.find({}, { _id: 0 }, (err, docs) => {
        var response = {
            title: "KPI Impact",
            data: docs
        }
        res.json(response);
    });
});


//genders
router.get("/gender/aggregate", (req, res, next) => {
    Genders.find({}, { _id: 0 }, (err, docs) => {
        res.json(docs);
    });
});


//sentiments
router.get("/sentiment/aggregate", (req, res, next) => {
    var options = [{
        $project: {
            // "label" : "Positive",
            value: "$Positive",
            // Positive:1,
            _id: 0
        }
    }];
    Sentiments.aggregate(options, (err, docs) => {
        // var temp = map(docs, function (c) {
        //     var a=[{label:c.Positive},
        //     {label:c.Negative},
        // {label:c.Female}];
        //     return a;
        // });
        var response = {
            title: "Sentiment Analysis",
            data: [
                {
                    label: "positive",
                    docs
                    //    value : docs.entries.values
                }]
        }
        res.json(response);
    });
});


//impressions
router.get("/impressions/aggregate", (req, res, next) => {
    Impressions.find({}, { _id: 0 }, (err, docs) => {
        var response = {
            title: "Impressions - last 30 days",
            data: docs
        }
        res.json(response);
    });
});


//dashboardheaderfooter
router.get("/dashboardheaderfooter", (req, res, next) => {
    var response = {
        "stateName": "Uttar Pradesh",
        "stateLogo": "uttarpradesh.png",
        "supportedLanguages": [
            {
                "label": "English",
                "value": "en"
            }
        ],
        "socialMediaLinks": [
            {
                "label": "rss",
                "value": "https://www.rss.com"
            },
            {
                "label": "twitter",
                "value": "https://twitter.com"
            },
            {
                "label": "dribbble",
                "value": "https://dribbble.com"
            },
            {
                "label": "vimeo",
                "value": "https://vimeo.com"
            },
            {
                "label": "facebook",
                "value": "https://www.facebook.com"
            },
            {
                "label": "forrst",
                "value": "https://forrst.com"
            },
            {
                "label": "youtube",
                "value": "https://www.youtube.com"
            }
        ]
    };
    res.send(response);
});


//programs
router.get("/programs", (req, res, next) => {
    Schemes.aggregate([{
        $group: {
            _id: "$programId", programName: { $first: "$programName" }
        }
    },
    {
        $project: {
            programId: "$_id",
            programName: "$programName",
            _id: 0
        }
    }], (err, docs) => {
        res.json(docs);
    });
});


//schemes
router.get("/schemes", (req, res, next) => {
    var programId = req.query.programId;
    Schemes.aggregate([
        {
            $match: { programId: programId }
        },
        {
            $project: {
                schemeId: 1,
                schemeName: 1,
                _id: 0
            }
        }], (err, docs) => {
            res.json(docs);
        });
});

//scheme/summary
router.get("/scheme/summary", (req, res, next) => {
    let scheme = null, feed = null, senti = null;
    var schemeId = req.query.schemeId;
    var options = [
        {
            $match: { schemeId: schemeId }
        },
        {
            $project: {

                schemeId: 1,
                schemeName: 1,
                KPI: 1,
                startDate: "$startdate",
                endDate: "$enddate",
                _id: 0
            }
        }];
    var option = [
        {
            $project: {
                positive: "$Positive",
                negative: "$Negative",
                neutral: "$Neutral",
                _id: 0
            }
        }];
    var showValue = () => {
        if (scheme != null && feed != null && senti != null) {

            var result = scheme[0];
            result["peoplesvoice"] = senti[0];
            result["feedback"] = feed[0];
            res.json(result);
        }
    }
    Schemes.aggregate(options, (err, docs) => {
        scheme = docs;
        showValue();

    });
    Feedbackpulses.find({}, { _id: 0 }, (err, docs) => {
        feed = docs;
        showValue();
    });

    Sentiments.aggregate(option, (err, docs) => {
        senti = docs;
        showValue();
    });
});
//........... Completed .............

// router.get("/feedback", (req, res, next) => {
//     var fb = Feedbackpulses.find({}, { _id: 0 }, (err, docs) => {
//         return (docs);
//     });
// });

//schemes
// router.get("/scheme/summary", (req, res, next) => {
//     var schemeId = req.query.schemeId;
//     var options = [
//         {
//             $project: {
//                // feedback:
//                 //{
//                     open :1,
//                     responded : "$acknowledged",
//                     avgTurnAroundTime : "$avgresponsetime",
//               //  },
//                 _id: 0,
//             }
//         }];
//         var option = [
//             {
//             $match: { schemeId: schemeId }
//             },
//         {
//             $project: {
//                 _id :0,
//                 schemeId: 1,
//                 schemeName: 1,
//                 KPI: 1,
//                 startDate: "$startdate",
//                 endDate: "$enddate",
//                 feedback:1
//             }
//         }];
//        Schemes.find({ schemeId: schemeId },{
//                 _id :0,
//                 schemeId: 1,
//                 schemeName: 1,
//                 KPI: 1,
//                 startdate :1,
//                 endDate: "$enddate",
//                 feedback:1
//             })
//        .populate('feedback',{open : 1}).exec(function(err,feed){
//         res.json(feed)
//     });
// });

// })
//         {
//       $lookup: {
//          from: "feedbackpulses",
//          localField: "schemeId",    // field in the orders collection
//          foreignField: "schemeId",  // field in the items collection
//          as: "feedback"
//       }
//    },
//         {
//             $match: { schemeId: schemeId }
//         }
// ,

// {
//     $project: {
//         schemeId: 1,
//         schemeName: 1,
//         KPI: 1,
//         startDate: "$startdate",
//         endDate: "$enddate",
//  feedback : fb,
/*   currentSpeed : "",
   requiredSpeed : "",
   "progressData": {
"completedCount": 250,
"remainingCount": 2083,
"totalCount": 2333,
"completedDuration": 4,
"remainingDuration": 6,
"totalDuration": 10,
"completedBudget": 250,
"remainingBudget": -145,
"totalBudget": 105
},
"peoplesVoice": {
"positive": 98,
"negative": 1,
"neutral": 1
},
"feedback": {
"open": 537,
"responded": 6240,
"avgTurnAroundTime": 9
},
"pulse": {
"broadcasts": 10,
"responses": "32k/1M"
},*/
//         _id: 0
//     }
// }



//mapheaderfooters
router.get("/mapheaderfooter/aggregate", (req, res, next) => {
    var options = [
        {
            $project: {
                label: 1,
                value: 1,
                _id: 0
            }
        }
    ];
    Mapheaderfooters.aggregate(options, (err, docs) => {
        res.json(docs);
    });
});

//......................in Progress.................

//status
router.get("/status/aggregate", (req, res, next) => {
    var segment = parseInt(req.query.segment);
    var options = [
        {
            $group: { _id: "$stage", status: { $first: "$status" } }
        },
        {
            $sort: {
                "_id": 1
            }
        },
        {
            $project: {
                //    key: "$status",
                //  type : "bar",
                //    yAxis : "1",
                values: {
                    x: "$_id",
                    y: "$statusvalue"
                },
                _id: 1
            }
        }
    ];
    if (segment) {
        options.splice(0, 0, {
            $match: { segment: segment }
        });
    }
    Status.aggregate(options, (err, docs) => {
        var response = {
            title: "Status",
            data: docs
            // [
            //     {
            //         key: "$status",
            //         type: "bar",
            //         yAxis: 1,
            //         values: docs
            //     }
            // ]
        };
        res.json(response);
    });
});

router.get("/summary", (req, res, next) => {
    Summary.find({}, (err, docs) => {
        res.json(docs);
    });
});

//stages
router.get("/stage/aggregate", (req, res, next) => {
    Stages.find({}, { _id: 0 }, (err, docs) => {
        res.json(docs);
    });
});


//promise
router.get("/scheme/summary/promise", (req, res, next) => {
    var schemeId = req.query.schemeId;
    var options = [
        {
            $match: { schemeId: schemeId }
        },
        {
            $project: {

                schemeId: 1,
                schemeName: 1,
                KPI: 1,
                startDate: "$startdate",
                endDate: "$enddate",
                _id: 0
            }
        }];
    var option = [
        {
            $project: {
                positive: "$Positive",
                negative: "$Negative",
                neutral: "$Neutral",
                _id: 0
            }
        }];
    let sch = new Promise(function (resolve, reject) {
        Schemes.aggregate(options, (err, docs) => {
            resolve(docs);
        });
    });

    let feedbk = new Promise(function (resolve, reject) {
        Feedbackpulses.find({}, { _id: 0 }, (err, docs) => {
            resolve(docs);
        });
    });
    let sentimt = new Promise(function (resolve, reject) {
        Sentiments.aggregate(option, (err, docs) => {
            resolve(docs);
        });
    });
    Promise.all([sch, feedbk, sentimt]).then(function (data) {
        let [scheme, feed, senti] = data
        let result = scheme[0];
        result["peoplesvoice"] = senti[0];
        result["feedback"] = feed[0];
        res.json(result);
    });
});
//
router.get("/", (req, res, next) => {
    Summary.aggregate([
        {
            $project: {
                _id: 0,
                schemeName: "$Scheme Name",
                KPI: 1,
                startDate: "$Start Date",
                endDate: "$End Date"
            }
        }
    ], (err, docs) => {
        res.json(docs);
    });
});

module.exports = router;

