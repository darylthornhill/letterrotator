var alphabet =  '•◘○♠♣♦☺☻♥$♀↨-=~`!@#$%^&*()?|{}[]:;<>,./\'"_+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ  abcdefghijklmnopqrstuvwxyz';

var FlowLetter = function(letter)
{
    this.element = document.createElement('span');
    this.letter = letter[0]; // make sure there is only one letter
    this.loops = 0;
    this.change = function()
    {
        var _this = this;
        this.loop = setTimeout(function(){_this.change()}, Math.floor( (Math.random()+1) *5))
        this.loops++;
        this.element.innerHTML = alphabet[this.loops];

        if( this.letter == alphabet[this.loops] )
        {
            this.element.innerHTML = this.letter;
            clearTimeout(this.loop)
        }
    }
    this.change()
}
var FlowString = function(string)
{
    this.string = string;
    this.element = document.createElement('p');
    this.loop = null;
    this.loops = 0;
    this.addLetter = function()
    {
        var _this = this;
        this.loop = setTimeout(function(){_this.addLetter()}, Math.floor( (Math.random()+1) *5));
        if( this.loops == this.string.length )
        {
            clearTimeout(this.loop);
            return;
        }
        var letter = new FlowLetter(this.string[this.loops]);
        this.element.appendChild(letter.element);
        this.loops++;
    }
    this.addLetter();
}

var heading = new FlowString('Type some stinky bottom putty in and see the magic! ');
document.body.appendChild(heading.element)


typedLetters = [];
window.onkeydown = function(e)
{
    e.preventDefault();
    switch(e.keyCode)
    {
        case 16: return;
        case 8:
            document.body.removeChild(typedLetters[(typedLetters.length-1)].element);
            typedLetters.pop(typedLetters[(typedLetters.length-1)])
            return;
    }

    var letter = new FlowLetter(String.fromCharCode(e.keyCode).toLowerCase());
    typedLetters.push(letter);
    document.body.appendChild(letter.element)
}