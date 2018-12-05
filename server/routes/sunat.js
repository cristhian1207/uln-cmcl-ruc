const sunat = require('scraper-ruc-sunat');
const scraper = require('sunat-ruc-scraper2');
const express = require('express');

const app = express();

app.get('/sunat/:ruc', (req, res) => {
    let ruc = req.params.ruc;
    scraper.getInformation(ruc, (err, data) => {
        if (err) {
            return res.status(400).json({
                sucess: false,
                error: err
            });
        }
        res.json({
            sucess: true,
            data
        });
    });
});

app.get('/sunat/all/:ruc', (req, res) => {
    let ruc = req.params.ruc;
    scraper.getAllInformation(ruc, (err, data) => {
        if (err) {
            return res.status(400).json({
                sucess: false,
                error: err
            });
        }
        res.json({
            sucess: true,
            data
        });
    });
});

app.get('/sunat/repleg/:ruc/:razsoc', (req, res) => {
    let ruc = req.params.ruc;
    let razsoc = req.params.razsoc;
    sunat.getRepLeg(ruc, razsoc, (err, data) => {
        if (err) {
            return res.status(400).json({
                sucess: false,
                error: err
            });
        }
        res.json({
            sucess: true,
            data
        });
    });
});

app.get('/sunat/locaanex/:ruc/:razsoc', (req, res) => {
    let ruc = req.params.ruc;
    let razsoc = req.params.razsoc;
    sunat.getLocAnex(ruc, razsoc, (err, data) => {
        if (err) {
            return res.status(400).json({
                sucess: false,
                error: err
            });
        }
        res.json({
            sucess: true,
            data
        });
    });
});

app.get('/sunat/cantrab/:ruc/:razsoc', (req, res) => {
    let ruc = req.params.ruc;
    let razsoc = req.params.razsoc;
    sunat.getCantTrab(ruc, razsoc, (err, data) => {
        if (err) {
            return res.status(400).json({
                sucess: false,
                error: err
            });
        }
        res.json({
            sucess: true,
            data
        });
    });
});

app.get('/sunat/actpro/:ruc/:razsoc', (req, res) => {
    let ruc = req.params.ruc;
    let razsoc = req.params.razsoc;
    sunat.getActPro(ruc, razsoc, (err, data) => {
        if (err) {
            return res.status(400).json({
                sucess: false,
                error: err
            });
        }
        res.json({
            sucess: true,
            data
        });
    });
});

app.get('/sunat/infhis/:ruc/:razsoc', (req, res) => {
    let ruc = req.params.ruc;
    let razsoc = req.params.razsoc;
    sunat.getInfHis(ruc, razsoc, (err, data) => {
        if (err) {
            return res.status(400).json({
                sucess: false,
                error: err
            });
        }
        res.json({
            sucess: true,
            data
        });
    });
});

module.exports = app;