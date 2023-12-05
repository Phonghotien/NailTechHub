export default function ChartModule() {
  // Thanh tiến trình hình tròn
  (function ($) {
    $.fn.percentPie = function (options) {
      var settings = $.extend(
        {
          width: 100,
          trackColor: "EEEEEE",
          barColor1: "777777",
          barColor2: "777777",
          barWeight: 30,
          startPercent: 0,
          fps: 60,
        },
        options
      );

      var percentage = $(this).data("percent") / 100;

      this.css({
        width: settings.width,
        height: settings.width,
      });

      var that = this,
        hoverPolice = false,
        canvasWidth = settings.width,
        canvasHeight = canvasWidth,
        id = $("canvas").length,
        canvasElement = $(
          '<canvas id="' +
            id +
            '" width="' +
            canvasWidth +
            '" height="' +
            canvasHeight +
            '"></canvas>'
        ),
        canvas = canvasElement.get(0).getContext("2d"),
        centerX = canvasWidth / 2,
        centerY = canvasHeight / 2,
        radius = settings.width / 2 - settings.barWeight / 2;
      var counterClockwise = false;
      var fps = 1000 / settings.fps / 2;
      var update = 0.01;
      this.angle = settings.startPercent;

      this.drawArc = function (startAngle, percentFilled, color1, color2) {
        var drawingArc = true;
        canvas.beginPath();
        canvas.arc(
          centerX,
          centerY,
          radius,
          (Math.PI / 180) * (startAngle * 360 - 90),
          (Math.PI / 180) * (percentFilled * 360 - 90),
          counterClockwise
        );
        var grd = canvas.createLinearGradient(0, 0, settings.width, 0);
        grd.addColorStop(0, color1);
        grd.addColorStop(1, color2);
        canvas.strokeStyle = grd;
        canvas.lineWidth = settings.barWeight;
        canvas.stroke();
        drawingArc = false;
      };

      this.fillChart = function (stop) {
        $({
          numberValue: 0,
        }).animate(
          {
            numberValue: percentage * 100,
          },
          {
            duration: fps * 120,
            easing: "linear",
            step: function () {
              that.find(".tag").text(Math.ceil(this.numberValue));
            },
          }
        );
        var loop = setInterval(function () {
          hoverPolice = true;
          canvas.clearRect(0, 0, canvasWidth, canvasHeight);

          that.drawArc(0, 360, settings.trackColor, settings.trackColor);
          that.angle += update;
          that.drawArc(
            settings.startPercent,
            that.angle,
            settings.barColor1,
            settings.barColor2
          );

          if (that.angle > stop) {
            clearInterval(loop);
            hoverPolice = false;
          }
        }, fps);
      };

      this.fillChart(percentage);
      this.append(canvasElement);
      return this;
    };
  })(jQuery);

  $(document).ready(function () {
    $(".chart-js").each(function (index, element) {
      $(element).percentPie({
        width: 100,
        trackColor: "#F1EFFB",
        barColor1: "#EAABF0",
        barColor2: "#4623E9",
        barWeight: 20,
        fps: 60,
      });
    });
  });
  $(document).ready(function () {
    $(".hd-chart-js").each(function (index, element) {
      $(element).percentPie({
        width: 70,
        trackColor: "#F1EFFB",
        barColor1: "#EAABF0",
        barColor2: "#4623E9",
        barWeight: 10,
        fps: 60,
      });
    });
  });
}
