//This class accepts any array given and sorts the inputs, after the array will calculate all relate functions displayed on output
function MainCalc(numberarray) {
    this.numberarray = numberarray.sort(function(a, b){return a - b})
    let mean;
    //Calculates mean by taking all indiviual numbers and dividing it by the legnth of the array
    this.setMean = function(){
        var rawMean = 0;
        for(var i = 0; i < numberarray.length; i++){
            rawMean += Number(numberarray[i]);
        }
        console.log(rawMean);
        mean = rawMean/numberarray.length;
    }
    //get functions return the value given
    this.getMean = function(){
        return mean;
    }
    //this get function returns a rounded version of the mean
    this.getMean = function(num){
        if (num === 0)
        {
            return Math.round(mean);
        }
        return mean;
    }
    let median;
    //Uses one of three if statments to calculate the median of an array
    this.setMedian = function(){
        //Reuse of the Mean function for this special case
        if (numberarray.length == 2)
        {
            var RawMed = 0;
            for(var i = 0; i < numberarray.length; i++){
                rawMed += numberarray[i];
            }
            median=RawMed/2;
        }
        //Finds the approximate "middle" by taking the two closet numbers and dividing between them
        else if (numberarray.length % 2 === 0)
        {
            var RawMed = 0;
            var target = numberarray.length / 2;
            target = Math.round(target-1);
            for(var i = 0; i < numberarray.length; i++){
                if (i === target || i === (target-1))
                {
                    RawMed += numberarray[i];
                }
            }
            median=RawMed/2;
        }
        //Finds the exact middle of the array for an odd number of numbers in the array
        else
        {
            var target = numberarray.length / 2;
            target = Math.round(target-1);
            console.log("Target: " + target);
            for(var i = 0; i < numberarray.length; i++){
                if (i === target)
                {
                    median = numberarray[i];
                }
            }
        } 
    }
    this.getMedian = function(){
        return median;
    }
    //Selects the lowest number
    let minimum;
    this.setMinimum = function(){
        var loc = 0;
        var rawMin = 0;
        var i = 0;
        for(i = 0; i < numberarray.length; i++)
        {
            if(((Number(numberarray[i])) <= (rawMin)) || (i === 0))
            {
                console.log("Old Min: " + rawMin);
                console.log("I: " + i);
                loc = i;
                rawMin = numberarray[i];
                console.log("New Min: " + rawMin);
            }
        }
        minimum = rawMin;
    }
    this.getMinimum = function(){
        return minimum;
    }
    //Selects the highest number
    let maximum;
    this.setMaximum = function(){
        var loc = 0;
        var rawMax = 0;
        var i = 0;
        for(i = 0; i < numberarray.length; i++){
            if((Number(numberarray[i]) > rawMax) || (i === 0))
            {
                loc = i;
                rawMax = numberarray[i];
                console.log("New Max: " + rawMax);
            }
        }
        maximum = rawMax;
    }
    this.getMaximum = function(){
        return maximum;
    }
    let range;
    //Subtracts the max from the min
    this.setRange = function(){
        range = (maximum - minimum);
    }
    this.getRange = function(){
        return range;
    }
    //Gets the Sorted array
    this.getArray = function(){
        return numberarray;
    }
    //Automaticly sets the given outputs and displays them to the console
    this.setMaximum();
    this.setMinimum();
    this.setRange();
    this.setMean();
    this.setMedian();
    console.log("Sorted Array: " + this.getArray());
    console.log("Range: " + this.getRange());
    console.log("Maximum: " + this.getMaximum());
    console.log("Minimum: " + this.getMinimum());
    console.log("Median: " + this.getMedian());
    console.log("Mean: " + Math.round(this.getMean()));
    console.log("Finished Calculations");
    console.log(" ");
};

//Set to accept history inputs as cookies, however, some difficuties prevented its instalation
/*function SetHistoryCookie() {
    ;
}*/

//Loads all events as the DOM loads.
window.addEventListener("DOMContentLoaded", function() {
    let forminput = document.querySelectorAll(".inputfeild");
    let forminputThree = document.querySelector("#formselectthree");
    let forminputFull = document.querySelector("#formselectfull");
    let startsubmit = document.getElementById("sub");
    //Not used currently
    let cookieckeck = document.getElementById("historyfound");
    for(var i = 0; i < forminput.length; i++)
    {
        forminput[i].addEventListener("keydown", unwantedPressLimit);
    }
    startsubmit.addEventListener("submit", verifyForm);
    forminputThree.addEventListener("click", clickHandlerSwitchThree);
    forminputFull.addEventListener("click", clickHandlerSwitchFull);
});

//Handles changing the feild in which number enties are inputed: this feild changes the input to accept limited outputs [3 numbers]
function clickHandlerSwitchThree(_event) {
    var finder = document.getElementById("forminput");
    finder.outerHTML = "<div id='forminput' class='form-check-inline d-flex justify-content-center'><input class='inputfeildlimit form-control-sm' type='text' name='array1' id='a1' placeholder='Number: 1'> <input class='inputfeildlimit form-control-sm' type='text' name='array2' id='a2' placeholder='Number: 2'> <input class='inputfeildlimit form-control-sm' type='text' name='array3' id='a3' placeholder='Number: 3'></div>";
    _event.target.style.border = 'solid cornflowerblue';
    var forminputFull = document.querySelector("#formselectfull");
    forminputFull.style.border = 'dotted cornflowerblue';
    let forminputlimit = document.querySelectorAll(".inputfeildlimit");
    console.log("Preping Logging Events");
    for(var i = 0; i <forminputlimit.length; i++)
    {
        forminputlimit[i].addEventListener("keydown", unwantedPressLimit);
        console.log("Logging Events");
    }
}

//Handles changing the feild in which number enties are inputed: this feild changes the input to accept unlimted outputs
function clickHandlerSwitchFull(_event) {
    var finder = document.getElementById("forminput");
    finder.outerHTML = "<div id='forminput' class='form-check-inline d-flex justify-content-center'><input class='inputfeild form-control-sm' type='text' name='array' id='b1' placeholder='Enter Numbers'></div>";
    _event.target.style.border = 'solid cornflowerblue';
    var forminputThree = document.querySelector("#formselectthree");
    forminputThree.style.border = 'dotted cornflowerblue';
    let forminput = document.querySelectorAll(".inputfeild");
    console.log("Preping Logging Events");
    for(var i = 0; i <forminput.length; i++)
    {
        forminput[i].addEventListener("keydown", unwantedPress);
        console.log("Logging Event");
    }
}

//removes any non-integer number from being accepted
function unwantedPress(_event) {
    var intCheck = isFinite(_event.key);
    if((!(isFinite(_event.key))) && (_event.key != " ") && (_event.key != "Backspace") && (_event.key != "Tab") && (_event.key != "-"))
    {
        console.log("Not a number:" + _event.key);
        _event.preventDefault();
    }
}

//removes any non-integer number and space from being apcepted
function unwantedPressLimit(_event) {
    if((!(isFinite(_event.key))) && (_event.key != "Backspace") && (_event.key != "Tab") && _event.key != "-")
    {
        console.log("Not a (Limit) number:" + _event.key);
        _event.preventDefault();
    }
    else if (_event.key === " ")
    {
        _event.preventDefault();
        console.log("NOT a (Limit) number:" + _event.key);
    }
    else
    {
        console.log("Limit Number:" + "'"+ _event.key + "'");
    }
}

//used to claculate and display the result from the inputed numbers whether it came from a limited or unlimeted value doesn't mater as valuses
//have been seperated to show to arrange the inputs into a single array that works after the begining fork
function verifyForm(_event) {
    console.log("Starting Verify Form Confirmation")
    let result;
    //used to put three numbers into the single array
    if((document.getElementsByClassName('inputfeildlimit').length) > 1)
    {
        console.log("Limited Output");
        var number = [];
        var n1 = document.getElementById("a1").value;
        number.push(n1);
        console.log(n1);
        var n2 = document.getElementById("a2").value;
        number.push(n2);
        console.log(n2);
        var n3 = document.getElementById("a3").value;
        number.push(n3);
        console.log(n3);
        console.log(number);
        result = new MainCalc(number);
    }
    //NOTE: commented code from this point forward was used in the matter of debugging and finding other methods of calculation
    //Used to split all numbers from the unlimited feild into a single array as the only inputs are any integer or space, the only
    //split needed was space to be included
    else if ((document.getElementsByClassName('inputfeild').length) === 1)
    {
        console.log("Unlimited Output");
        var number = document.getElementById("b1").value;
        var unnumber = (number.split(" "));
        //alert("First Int:" + Number(unnumber[0]));
        //var num2 = [];
        //var i;
        /*for (i = 0; i < unnumber.length; i++)
        {
            num2.push(unnumber[i]);
            console.log("array at [" + i + "]:" + num2)
        }
        console.log("Upgraded:" + unnumber);*/
        result = new MainCalc(unnumber);
    }
    var roundcheck = document.getElementById("r1");
    roundcheck = roundcheck.checked;
    console.log(roundcheck);
    //alert(roundcheck);

    document.getElementById("max").value = result.getMaximum();
    document.getElementById("min").value = result.getMinimum();
    document.getElementById("range").value = result.getRange();
    document.getElementById("med").value = result.getMedian();
    document.getElementById("arraysorted").value = result.getArray();
    if (roundcheck == 1)
    {
        document.getElementById("mean").value = result.getMean(0);
        //alert("Rounded");
    }
    else if (roundcheck == 0)
    {
        document.getElementById("mean").value = result.getMean();
        //alert("Not Rounded");
    }

}

//Used to Clear the feild of any Output values upon pressing the reset button [This ]
function ClearField() {
    document.getElementById("max").value = "";
    document.getElementById("min").value = "";
    document.getElementById("range").value = "";
    document.getElementById("med").value = "";
    document.getElementById("mean").value = "";
    document.getElementById("arraysorted").value = "";
}