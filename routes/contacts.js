var express = require("express");
var router = express.Router();
var contactModel = require('../models/contactModel');
router.get("/", function (req, res, next) {
  contactModel.find((err, cont) => {
    res.render("form.twig", {
      title: "Contact list",
      cont,
    });
  });
});
router.post("/", async function (req, res, next) {

  await new contactModel({
    FullName: req.body.FullName,
    Phone: req.body.Phone,
  }).save();
  res.redirect("/contacts");
});
router.get("/deleteContact/:id", async function (req, res, next) {
  const {id} = req.params;
  await contactModel.findByIdAndDelete(id);
  res.redirect("/contacts");
});
router.get("/modifyContact/:id", async function (req, res, next) {
  const {id} = req.params;
  const contact = await contactModel.findById(id);
  res.render("modify.twig", {
    title: "modify contact",
    contactId: id,
    FullName: contact.FullName,
    Phone: contact.Phone,
  });

});
router.post("/saveContactModification", async function (req, res, next) {
  const {Fullname, Phone, id} = req.body;
  console.log(Fullname, Phone, id);
  await contactModel.findByIdAndUpdate(req.body.id, { FullName: req.body.Fullname, Phone: req.body.Phone });
  res.redirect("/contacts");
});
module.exports = router;
