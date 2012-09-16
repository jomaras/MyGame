Ostro.Helpers.CanvasDrawerHelper =
{
    drawCircle: function(context, circle, fillColor)
    {
        context.fillStyle = fillColor;
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, Math.PI*2, 0, true);
        context.closePath();

        context.stroke();
        context.fill();
    },

    drawRadialLineAtAngle: function(context, startX, startY, angleFraction, length, color)
    {
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(startX + length * Math.cos(angleFraction), startY - length * Math.sin(angleFraction));

        context.closePath();
        context.stroke();

        /*context.save();
        context.translate(length, length);
        context.rotate(Math.PI * (2 * angleFraction - 0.5));
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(startX, 0)
        context.lineTo(startY, 0);
        context.stroke();
        context.restore();*/
    }
};