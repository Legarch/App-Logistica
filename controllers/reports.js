var pdf = require('html-pdf');
var fs = require('fs');
var uuid = require('node-uuid');

var HojaRuta = require('../models/hojaRuta')
var necesidad = require('../models/necesidadCarga')
var necesidadDetall = require('../models/necesidadCargaDetalle')

module.exports = {

    reportHojaRuta: function (req, res) {
        HojaRuta.get(req.params.id, function (err, response) {
            if (err) {
                res.json({
                    status: "ERR",
                    message: "Ha ocurrido un error",
                    error: err
                });
            } else {             
                if(response._id){
                    //PDF Config
                    var footer = "";
                    var header ="<div class='header'>" +                                     
                                    "<img src='" + global.ipadress + "/css/images/electroluz-logo.jpg' style='width:35mm;height:20mm;float:left;margin-left:4mm;'>"+                                       
                                    "<h1 style='float:right;margin-right:4mm;'> REPORTE HOJA DE RUTA </h1>" +                                                                 
                                "</div>";

                    var options = {
                        format: 'A4',
                        "border": {
                            "top": "0",
                            "right": "10mm",
                            "bottom": "0",
                            "left": "10mm"
                        },
                        "footer": {
                            "height": "17mm",
                            "contents": {
                                default: footer
                            }
                        },
                        //Linux path:
                        phantomPath: '/usr/lib/node_modules/html-pdf/node_modules/.bin/phantomjs'
                        //Windows path:
                        //phantomPath: 'C:/Users/Usuario/AppData/Roaming/npm/node_modules/html-pdf/node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs'
                    };
    
                    var styles= "<style type='text/css'>" +
                                    "@import url('https://fonts.googleapis.com/css?family=Noto+Sans');" +
                                    "html{" +
                                        "font-size: 12px;" +
                                        "font-family: 'Noto Sans', sans-serif;" +
                                    "}"+
                                    ".border-title{"+
                                        "border: 1px solid;" +
                                        "text-align:center;"+
                                        "margin-top:4mm;"+
                                    "}"+
                                    ".header{"+
                                        "border: 1px solid;" +
                                        "border-top: 0px;" +
                                        "height: 25mm;" +
                                    "}"+
                                    ".border-data{"+
                                        "border: 1px solid;" +
                                        "border-top: 0px;" +
                                        "display: flex;" +                                        
                                    "}"+
                                    ".title-data{"+
                                        "font-weight: 600;"+
                                        "text-decoration: underline;"+
                                        "margin-bottom:2mm;"+
                                        "width:14%;"+
                                    "}"+
                                    ".span-data{"+
                                        "display: block;"+
                                        "padding-top:1mm;"+
                                        "padding-bottom:1mm"+
                                    "}"+
                                    ".data-detalle{"+
                                        "width:14%;"+
                                    "}"+
                                    ".detalle-line{" +                                        
                                        "display: block;" +
                                        "text-align: center;" +                                        
                                        "min-height: 4mm;" +
                                        "padding: 2px 0 2px 0;" +                                        
                                        "overflow: overlay;" +  
                                        "border: 1px solid;" +
                                        "border-top: 0px;" +                                      
                                    "}" +
                                    ".detalle-line span{" +
                                        "display: block;" +
                                        "float: left;" +
                                        "margin: 0;" +
                                        "padding: 0.5mm 0 0.5mm 0;" +
                                    "}" +
                                    ".separator{" +
                                        "width: 3%;" +
                                        "background: white !important;" +
                                        "color: white;" +
                                    "}" +
                                    ".salto-de-pagina{" +
                                        "page-break-before: always;" +
                                        "break-before: always;" +
                                    "}" +
                                "</style>";
                    
                        var datosHoja = "<div class='border-title'>" +
                                            "<h3> DATOS DE LA HOJA DE RUTA</h3>"+
                                        "</div>" +
                                        "<div class='border-data'>"+
                                            "<div style='float:left;width:46%;border-right: 1px solid;padding-left:3mm;margin-right:3mm;height:42mm;'>"+
                                                "<span class='title-data'> TRANSPORTE </span>"+
                                                "<span class='span-data'><b>Marca: </b>"+ response.transporte.marca +"</span>"+
                                                "<span class='span-data'><b>Modelo: </b>"+ response.transporte.modelo +"</span>"+
                                                "<span class='span-data'><b>Patente: </b>"+ response.transporte.patente +"</span>"+
                                                "<span class='span-data'><b>Peso máximo: </b>"+ response.transporte.cargaMaxima +" Kg</span>"+
                                                "<span class='span-data'><b>Volumen máximo: </b>"+ response.transporte.volumen +" m³</span>"+
                                                "<span class='span-data'><b>Chofer: </b>"+ response.transporte.chofer +"</span>"+
                                            "</div>"+
                                            "<div style='height:42mm;'>"+
                                                "<span class='title-data'> CARGA </span>"+
                                                "<span class='span-data'><b>Estado: </b>"+ response.estadoCarga.estado +"</span>"+
                                                "<span class='span-data'><b>Volumen total: </b>"+ response.volumenTotal +" m³</span>"+
                                                "<span class='span-data'><b>Peso total: </b>"+ response.pesoTotal +" Kg</span>"+
                                            "</div>"+
                                        "</div>";  
                                   
                    var detalleHoja =   "<div class='border-title' style='margin-top:4mm;'>" +
                                            "<h3>DETALLE HOJA DE RUTA</h3>"+
                                        "</div>"+
                                        "<div class='detalle-line'>"+
                                            "<span class='title-data'> Cantidad </span>"+  
                                                "<span class='separator' style='width:0%!important'>s</span>" +                                          
                                            "<span class='title-data'> Carga </span>"+     
                                                "<span class='separator'>s</span>" +                                                                                   
                                            "<span class='title-data'> Orígen </span>"+                                                                                        
                                                "<span class='separator'>s</span>" +
                                            "<span class='title-data'> Destino </span>"+                                                                                        
                                                "<span class='separator'>s</span>" +
                                            "<span class='title-data'> Dirección </span>"+                                                                                        
                                                "<span class='separator'>s</span>" +                                            
                                            "<span class='title-data'> Fecha entrega </span>";                                          
                                        

                    var steps = function(x){
                        if(x < response.detalle.length){   
                            if(response.detalle[x].necesidadDetalle.fecha){
                                var fecha = new Date(response.detalle[x].necesidadDetalle.fecha);       
                            }                                              
                            detalleHoja +=   "<span class='data-detalle'>"+ response.detalle[x].necesidadDetalle.cantidad +"</span>"+  
                                                    "<span class='separator' style='width:0%!important'>s</span>" +                                          
                                                "<span class='data-detalle'>"+ response.detalle[x].necesidadDetalle.formatoCarga.nombre +" </span>"+     
                                                    "<span class='separator'>s</span>" +                                                                                   
                                                "<span class='data-detalle'>"+ response.detalle[x].necesidadDetalle.origen +"</span>"+                                                                                        
                                                    "<span class='separator'>s</span>" +
                                                "<span class='data-detalle'>"+ response.detalle[x].necesidadDetalle.necesidad.localidad.nombre +"</span>"+                                                                                        
                                                    "<span class='separator'>s</span>" +
                                                "<span class='data-detalle'>"+ response.detalle[x].necesidadDetalle.necesidad.direccion +"</span>"+                                                                                        
                                                    "<span class='separator'>s</span>" +                                            
                                                "<span class='data-detalle'>"+ fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/"+ fecha.getFullYear() +"</span>";
                            steps(x+1);
                        }     
                        else{
                            detalleHoja += "</div>";//Cierra el detalle de la hoja


                            html = "<html>" +
                            "<head>" +
                                styles +
                            "</head>" +
                            "<body>" +
                                header +
                                datosHoja +
                                detalleHoja +
                            "</body>" +
                            "</html>";

                            if(response.reporte.exist){
                                fs.unlink('./front/downloads/reports/' + response.reporte.name,function(err){
                                    if(err){
                                        console.log("error unlink: " + err)
                                    }                                    
                               }); 
                            }

                            var nombre = uuid.v1() + '.pdf';
            
            
            
                            pdf.create(html, options).toFile('./front/downloads/reports/' + nombre, function (err, stream) {
                                if(err){
                                    res.json({
                                        status: "ERR",
                                        message: "Ha ocurrido un error",
                                        error: err
                                    });
                                    console.log(err)
                                }
                                else{
                                    response.reporte.exist = true;
                                    response.reporte.name = nombre;
                                    HojaRuta.update(response, function (err, response) {
                                        if (err) {
                                            res.json({
                                                status: "ERR",
                                                message: "Ha ocurrido un error",
                                                error: err
                                            });
                                        } else {
                                            return res.json({
                                                status: "OK",
                                                message: "PDF Creado",
                                                name: nombre
                                            });
                                        }
                                    }); 
                                }                                
                            })
                        }                   
                    }  
                    steps(0)                         
                }                
            }
        });        
    }
}