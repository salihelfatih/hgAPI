const { Repor } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const reports = await Report.findAll({
        limit: 10,
      });
      res.send(reports);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the reports",
      });
    }
  },

  async show(req, res) {
    try {
      const report = await Report.findByPk(req.params.reportId);
      res.send(report);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the report",
      });
    }
  },

  async post(req, res) {
    try {
      const report = await Report.create(req.body);
      res.send(report);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the report.",
      });
    }
  },

  async put(req, res) {
    try {
      await Report.update(req.body, {
        where: {
          id: req.params.reportId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the report.",
      });
    }
  },

  async delete(req, res) {
    try {
      const report = await Report.findOne({
        where: {
          id: req.params.reportId,
        },
      });
      await report.destroy();
      res.send(report);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the report.",
      });
    }
  },

  async deleteAll(req, res) {
    try {
      await Report.destroy({
        where: {},
        truncate: false,
      });
      res.send("All reports have been deleted");
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete all reports.",
      });
    }
  },

  async search(req, res) {
    try {
      const report = await Report.findOne({
        where: {
          reportName: req.params.reportName,
        },
      });
      res.send(report);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the report.",
      });
    }
  },

  async filter(req, res) {
    try {
      const report = await Report.findAll({
        where: {
          reportName: req.params.reportName,
        },
      });
      res.send(report);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the report.",
      });
    }
  },
};
