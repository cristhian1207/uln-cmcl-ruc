const sunat = require('scraper-ruc-sunat');
const scraper = require('sunat-ruc-scraper2');
const express = require('express');

const app = express();

const getUbigeo = (data) => {    
    let textArray = data.direccion_referencia.split('-');
    if (textArray.length < 3)
        return;
    let departamentoArray = textArray[textArray.length - 3].split(' ');
    data.departamento = departamentoArray[departamentoArray.length - 1];
    data.provincia = textArray[textArray.length - 2];
    data.distrito = textArray[textArray.length - 1];

    let ubigeo = `${data.departamento}-${data.provincia}-${data.distrito}`;
    data.direccion_referencia = data.direccion_referencia.replace(ubigeo, '').trimEnd();

    if (data.distrito = 'BRE?A'){
        data.distrito = 'BREÑA';
    }         
}

const transformData = (data) => {
    var object = { };
    object.ruc = data.ruc;
    object.razon_social = data.social_reason;
    object.tipo_contribuyente = data.contributor_type;
    object.nombre_comercial = data.business_name;
    object.fecha_inscripcion = data.registration_date;
    object.condicion = data.condition;
    object.estado = data.status;
    object.direccion_referencia = data.fiscal_address;    
    return object;
}

app.get('/sunat/:ruc', (req, res) => {
    let ruc = req.params.ruc;
    if (ruc.startsWith('10')){
        sunat.getInformation(ruc, (err, data) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                });
            }
            data = transformData(data);
            data.razon_social = data.razon_social.replace(/,/g, '');
            data.nombre_comercial = data.nombre_comercial.replace(/,/g, '');
            data.direccion_referencia = data.direccion_referencia.replace(/,/g, '');     
            getUbigeo(data);              
            res.json({
                sucess: true,
                data
            });
        });
    }else{
        scraper.getInformation(ruc, (err, data) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                });
            }
            data.razon_social = data.razon_social.replace(/,/g, '');
            data.nombre_comercial = data.nombre_comercial.replace(/,/g, '');
            data.direccion_referencia = data.direccion_referencia.replace(/,/g, '');
            getUbigeo(data);
            res.json({
                sucess: true,
                data
            });
        });
    }    
});

app.get('/sunat/all/:ruc', (req, res) => {
    let ruc = req.params.ruc;    
    scraper.getAllInformation(ruc, (err, data) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }        
        data.razon_social = data.razon_social.replace(/,/g, '');
        data.direccion_referencia = data.direccion_referencia.replace(/,/g, '');
        getUbigeo(data);        
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
                success: false,
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
                success: false,
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
                success: false,
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
                success: false,
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
                success: false,
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