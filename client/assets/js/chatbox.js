let loadChatBot = true;
async function lazy() {
  window.chatBotConfig = {
    "bot": "x1648203352276",
    "boot_host": "http://product-service-fe.dv/",
    "host": "http://product-service-be.dv/",
    "api_key": "19803eb8-28ec4e9f4444",
    "session_key": "SLIC_CHAT_TOKEN",
    "cookie": "BczxhRT5J3uZ7dUwDd64564gfdfgdfg456456t9",
    "organization_code": "SLIC",
    "product_code": "SLIC_WEBSITE",
    "messanger": "productMessanger",
    "language" : "TAMIL"
  };
  var resource = document.createElement("script");
  if (loadChatBot == true) {
    resource.async = "true";
    resource.src = "http://product-service-fe.dv/dist/plugin/main.min.js";
    var script = document.getElementsByTagName("script")[0];
    script.parentNode.insertBefore(resource, script);
    loadChatBot = false;
    return loadChatBot;
  }
}
document.addEventListener("keydown", (event) => {
  lazy();
});
window.onscroll = function (e) {
  lazy();
};
window.onmousemove = function () {
  lazy();
};