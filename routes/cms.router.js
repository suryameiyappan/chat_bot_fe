const express = require("express"),
axios = require('axios'),
router = express.Router();
  
  router.get("/dashboard", function (req, res, next) {
    let reqParams = {
      "module": "User",
      "module_code": "BasicDetails",
      "action": "getUserDetails",
      "data": {}
    };
    axios({
      method: 'POST',
      url: process.env.SERVICE_URL.concat("api/v1/product/service"),
      headers: {
        'Content-Type': 'application/json',
        'api-version': process.env.API_VERSION,
        "Authorization": 'Bearer ' + req.session.userId
      },
      data: JSON.stringify(reqParams)
    }).then(response => {
      const profileImage = response.data.data.profile_data;
      res.render("dashboard", { profileImage: profileImage });
    });
  });

  router.get("/organization", function (req, res, next) {
    let reqParams = {
      "module": "ChatBotCms",
      "module_code": "ChatCmsService",
      "action": "getOrganization",
      "data": {}
    };
    axios({
      method: 'POST',
      url: process.env.SERVICE_URL.concat("api/v1/chatbot/service"),
      headers: {
        'Content-Type': 'application/json',
        'api-version': process.env.API_VERSION,
        "Authorization": 'Bearer ' + req.session.userId
      },
      data: JSON.stringify(reqParams)
    }).then(response => {
      const profileImage = response.data.data.profile_data;
      console.log(profileImage);
      res.render("organization", { resData: response.data.data, profileImage: profileImage });
    });
  });

  router.get("/products", function (req, res, next) {
    let reqParams = {
      "module": "ChatBotCms",
      "module_code": "ChatCmsService",
      "action": "getProducts",
      "data": {}
    };
    axios({
      method: 'POST',
      url: process.env.SERVICE_URL.concat("api/v1/chatbot/service"),
      headers: {
        'Content-Type': 'application/json',
        'api-version': process.env.API_VERSION,
        "Authorization": 'Bearer ' + req.session.userId
      },
      data: JSON.stringify(reqParams)
    }).then(response => {
      const resData = response.data.data.product;
      const profileImage = response.data.data.profile_data;
      res.render("products", { products: resData.products, organization : resData.organization, profileImage: profileImage });
    });
  });

  router.get("/questions", function (req, res, next) {
    let reqParams = {
      "module": "ChatBotCms",
      "module_code": "ChatCmsService",
      "action": "getQuestions",
      "data": {}
    };
    axios({
      method: 'POST',
      url: process.env.SERVICE_URL.concat("api/v1/chatbot/service"),
      headers: {
        'Content-Type': 'application/json',
        'api-version': process.env.API_VERSION,
        "Authorization": 'Bearer ' + req.session.userId
      },
      data: JSON.stringify(reqParams)
    }).then(response => {
      const resData = response.data.data.question;
      const profileImage = response.data.data.profile_data;
      res.render("questions", { organization : resData.organization, questions : resData.questions, profileImage: profileImage});
    });
  });

  router.get("/questions/mapping", function (req, res, next) {
    let reqParams = {
      "module": "ChatBotCms",
      "module_code": "ChatCmsService",
      "action": "getQuestions",
      "data": {}
    };
    axios({
      method: 'POST',
      url: process.env.SERVICE_URL.concat("api/v1/chatbot/service"),
      headers: {
        'Content-Type': 'application/json',
        'api-version': process.env.API_VERSION,
        "Authorization": 'Bearer ' + req.session.userId
      },
      data: JSON.stringify(reqParams)
    }).then(response => {
      const resData = response.data.data.question;
      const profileImage = response.data.data.profile_data;
      res.render("question-mapping", { organization : resData.organization, questions : resData.questions, profileImage: profileImage});
    });
  });

  router.get("/language", function (req, res, next) {
    let reqParams = {
      "module": "ChatBotCms",
      "module_code": "ChatCmsService",
      "action": "getLanguages",
      "data": {}
    };
    axios({
      method: 'POST',
      url: process.env.SERVICE_URL.concat("api/v1/chatbot/service"),
      headers: {
        'Content-Type': 'application/json',
        'api-version': process.env.API_VERSION,
        "Authorization": 'Bearer ' + req.session.userId
      },
      data: JSON.stringify(reqParams)
    }).then(response => {
      const resData = response.data.data;
      const profileImage = response.data.data.profile_data;
      res.render("language", { resData: resData, profileImage: profileImage });
    });
  });

  router.get("/settings", function (req, res, next) {
    let reqParams = {
      "module": "ChatBotCms",
      "module_code": "ChatCmsService",
      "action": "getLanguages",
      "data": {}
    };
    axios({
      method: 'POST',
      url: process.env.SERVICE_URL.concat("api/v1/chatbot/service"),
      headers: {
        'Content-Type': 'application/json',
        'api-version': process.env.API_VERSION,
        "Authorization": 'Bearer ' + req.session.userId
      },
      data: JSON.stringify(reqParams)
    }).then(response => {
      const resData = response.data.data;
      const profileImage = response.data.data.profile_data;
      res.render("settings", { resData: resData, profileImage: profileImage });
    });
  });

module.exports = router;
