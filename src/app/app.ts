import * as express from "express";
import * as bodyParser from "body-parser";
import * as Mail from "./service/mail";

class App {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.routes();
  }
  routes() {

    this.app.route("/").get((req, res) => {
      res.send({ 'result': 'version 0.0.2' })
    });

    this.app.route("/").post((req, res) => {
      const message = Object.assign({}, req.body);

      Mail.to = message.to;
      Mail.subject = message.subject;
      Mail.message = message.message;
      let result = Mail.sendMail();

      res.status(200).json({ 'result': result })
    });


  }
}

export default new App();
