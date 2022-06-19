// @ts-check

const express = require("express");
const router = express.Router();
const passport = require("passport");
const DIULibrary = require("diu-data-functions");
const MiddlewareHelper = DIULibrary.Helpers.Middleware;
const EPCModel = require("../models/epc");

/**
 * @swagger
 * tags:
 *   name: EPC
 *   description: Energy Performance of Buildings Data for England and Wales
 */

/**
 * @swagger
 * /epc/:
 *   get:
 *     description: Returns the entire collection
 *     tags:
 *      - EPC
 *     parameters:
 *       - name: postcode
 *         description: UK Post Codew
 *         in: query
 *         type: string
 *         example: FY3 8NP
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Full List
 *       500:
 *         description: Internal Server Error
 */
router.get("/", (req, res, next) => {
    const callback = (err, results) => {
        if (err) {
            res.status(500).send({ success: false, msg: err });
        } else {
            if (results) {
                res.send(JSON.stringify(results));
            } else {
                res.send("[]");
            }
        }
    };

    // Get by?
    if (req.query.postcode) {
        EPCModel.getByPostCode(req.query.postcode, callback);
    } else {
        EPCModel.getAll(callback);
    }
});

module.exports = router;
