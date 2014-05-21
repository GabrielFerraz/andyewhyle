Poligono = function (points) {

    /**
    * @property {number} type - The base object type.
    */

    //if points isn't an array, use arguments as the array
    if (!(points instanceof Array))
    {
        points = Array.prototype.slice.call(arguments);
    }

    //if this is a flat array of numbers, convert it to points
    if (typeof points[0] === 'number')
    {
        var p = [];

        for (var i = 0, len = points.length; i < len; i += 2)
        {
            p.push(new Phaser.Point(points[i], points[i + 1]));
        }
    	console.log('constructor');
        points = p;
    }

    /**
    * @property {array<Phaser.Point>|array<number>} points - The array of Points.
    */
    this.points = points;

};

Poligono.prototype = {


    /**
    * Checks whether the x and y coordinates are contained within this polygon.
    *
    * @method Poligono#isPointInPoly
    * @param {Array} pt - The X and Y values of the coordinate to test.
    * @return {boolean} True if the coordinates are within this polygon, otherwise false.
    */
    isPointInPoly: function (pt){
        for(var c = false, i = -1, l = this.points.length, j = l - 1; ++i < l; j = i)
            ((this.points[i].y <= pt.y && pt.y < this.points[j].y) || (this.points[j].y <= pt.y && pt.y < this.points[i].y))
                && (pt.x < (this.points[j].x - this.points[i].x) * (pt.y - this.points[i].y) / (this.points[j].y - this.points[i].y) + this.points[i].x)
            && (c = !c);
        return c;
    }

};

Poligono.prototype.constructor = Poligono;