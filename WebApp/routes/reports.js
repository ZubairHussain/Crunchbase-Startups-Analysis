
exports.investments = function(req,res){

var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var funding_by_quarter = [];
var count=0;
var quarterly_funding = fs.createReadStream('../WebApplication/Data/funding_by_quarter.csv');
var Investment_by_country = fs.createReadStream('../WebApplication/Data/country_total_investments.csv');

var country=parse({delimiter: ','});
var parser = parse({delimiter: ','});

var _okeys = []
var _ovalues = []

parser.on('readable', function(){
  while(record = parser.read()){
    if(count!=0){ 
        _okeys.push(record[0])
        _ovalues.push(record[1])
        funding_by_quarter.push({
            key: record[0],
            value: Number(record[1])
        })  
    }
    count=1;
  }
});
parser.on('error', function(err){
  console.log(err.message);
});

parser.on('finish', function(){
  console.log("funding by quarter loaded....");
   
});
var country_labels = [];
var country_funds = [];
var country_count = 0;
country.on('readable', function(){
  while(record = country.read()){
    if(count!=1 && country_count<10){
    country_count=country_count+1; 
    num = Number(record[2])
    country_labels.push(record[1]);
    country_funds.push(num);
    }
    count=2;
  }
});
country.on('error', function(err){
  console.log(err.message);
});

country.on('finish', function(){
    console.log("country loaded....");
});

var Investment_type = fs.createReadStream('../WebApplication/Data/investment_type.csv');
var type = parse({delimiter: ','});
var type_names = [];
var type_values = [];
type.on('readable', function(){
  while(record = type.read()){
    if(count>=2){
    type_names.push(record[0]);
    type_values.push(Number(record[1]));
    }
    count=3;
  }
});

type.on('finish', function(){
   type_names.splice(0, 1);
  console.log("investment types loaded....");

});

var Investments_by_investors = fs.createReadStream('../WebApplication/Data/Investments_by_investors.csv');
var investors = parse({delimiter: ','});
var investors_names = [];
var investors_values = [];
investors.on('readable', function(){
  while(record = investors.read()){
    if(count>=3 ){
    investors_names.push(record[1]);
    investors_values.push(Number(record[2]));
    }
    count=4;
  }
});

investors.on('finish', function(){
  investors_names.splice(0, 1);
  investors_values.splice(0, 1);
  console.log("Investments_by_investors loaded....");
  res.render('investments', { funding_by_quarter:funding_by_quarter, keys:_okeys, values:_ovalues,country_labels:country_labels,country_funds:country_funds,type_names:type_names
          ,type_values:type_values,investors_names:investors_names,investors_values:investors_values});

});

Investment_by_country.pipe(country);
quarterly_funding.pipe(parser);
Investment_type.pipe(type);
Investments_by_investors.pipe(investors);

}

exports.acquisitions= function(req,res){

var acquisitions_labels = ["acquired","not acquired"];
var acquisitions_values = [11615,66652];

res.render('acquisitions',{acquisitions_labels:acquisitions_labels,acquisitions_values:acquisitions_values});

}

