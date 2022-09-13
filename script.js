const Plottable = require('plottable');

var data = [
    { "temp": 15, "altitude": 0 },
    { "temp": -55, "altitude": 12 },
    { "temp": -55, "altitude": 20 },
    { "temp": -3, "altitude": 50 },
    { "temp": -3, "altitude": 55 },
    { "temp": -95, "altitude": 80 },
    { "temp": -95, "altitude": 90 },
    { "temp": -45, "altitude": 100 }
];

var bands = [
    { "name": "troposphere", "low": -10, "high": 12 },
    { "name": "tropopause", "low": 12, "high": 20 },
    { "name": "stratosphere", "low": 20, "high": 50 },
    { "name": "stratopause", "low": 50, "high": 55 },
    { "name": "mesosphere", "low": 55, "high": 80 },
    { "name": "mesopause", "low": 80, "high": 90 },
    { "name": "thermosphere", "low": 90, "high": 110 }
];

var xScale = new Plottable.Scales.Linear();
var yScale = new Plottable.Scales.Linear();
xScale.domain([-100, 20]);
yScale.domain([-10, 110]);

var interpolatedColorScale = new Plottable.Scales.InterpolatedColor();
interpolatedColorScale.range(["#E3F2FD", "#2196F3"]);

var linePlot = new Plottable.Plots.Line()
    .x(function (d) { return d.temp; }, xScale)
    .y(function (d) { return d.altitude; }, yScale)
    .attr("stroke-width", 3)
    .attr("stroke", "black")
    .addDataset(new Plottable.Dataset(data));

var bandPlot = new Plottable.Plots.Rectangle()
    .x(0)
    .x2(function () { return bandPlot.width(); })
    .y(function (d) { return d.low; }, yScale)
    .y2(function (d) { return d.high; })
    .attr("fill", function (d) { return d.low + d.high; }, interpolatedColorScale)
    .attr("stroke", function (d) { return d.low + d.high; }, interpolatedColorScale)
    .addDataset(new Plottable.Dataset(bands));

var plots = new Plottable.Components.Group([bandPlot, linePlot]);

var xAxisCelsius = new Plottable.Axes.Numeric(xScale, "bottom");
var xAxisFahrenheit = new Plottable.Axes.Numeric(xScale, "top")
    .formatter(function (d) { return d * 9 / 5 + 32; });
var yAxisKilometers = new Plottable.Axes.Numeric(yScale, "left");
var yAxisMiles = new Plottable.Axes.Numeric(yScale, "right")
    .formatter(function (d) { return String((d * 0.62137).toPrecision(2)); });

var xLabelCelsius = new Plottable.Components.AxisLabel("Temperature (\xB0C)", "0");
var xLabelFahrenheit = new Plottable.Components.AxisLabel("Temperature (\xB0F)", "0");
var yLabelKilometers = new Plottable.Components.AxisLabel("Altitude (km)", "270");
var yLabelMiles = new Plottable.Components.AxisLabel("Altitude (miles)", "90");

var table = new Plottable.Components.Table([
    [null, null, xLabelFahrenheit, null, null],
    [null, null, xAxisFahrenheit, null, null],
    [yLabelKilometers, yAxisKilometers, plots, yAxisMiles, yLabelMiles],
    [null, null, xAxisCelsius, null, null],
    [null, null, xLabelCelsius, null, null]
]);

table.renderTo("svg#example");
