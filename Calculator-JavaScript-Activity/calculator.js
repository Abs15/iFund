// <!-- Author: Abubakar Basman
// Date: 8/2/2015 -->


var Calculator = function () {

    // Variable Declarations
    var self = this,
        decimalMark = ".",
        sum = 0,
        prevOperator;

    // Define default values of display is Zero
    self.display = ko.observable("0");
    self.isShowingResult = ko.observable(false);

    // Display numbers from buttons
    self.number = function (item, event) {   
        var button = event.target.innerText || event.target.textContent;

        // If naay sulod then mag click ug others unshow old data first
        if (self.isShowingResult()) {
            self.clearDisplay();
            self.isShowingResult(false);
        }

        // Allow one decimal point
        if (button == decimalMark && self.display().indexOf(decimalMark) > -1)
            return;

        // Replace zero by new number from clicked button
        var newValue = (self.display() === "0" && button != decimalMark) ? button : self.display() + button; 
        // Update the display value
        self.display(newValue);
    };

    // Tawagon niya ang operator ng button
    self.operator = function (item, event) {
        var button = event.target.innerText || event.target.textContent;
        // Computes when a number is clicked after the operator
        if (!self.isShowingResult()) {
            // Do the Calculation
            //Sum is the first number then oprator then the current display
            switch (prevOperator) {
                case "+":
                    sum = sum + parseFloat(self.display(), 10);
                    break;
                case "-":
                    sum = sum - parseFloat(self.display(), 10);
                    break;
                case "x":
                    sum = sum * parseFloat(self.display(), 10);
                    break;
                case "÷":
                    sum = sum / parseFloat(self.display(), 10);
                    break;
                default:
                    sum = parseFloat(self.display(), 10);
            };
        }

        // do not show the oprators, then wait next input
        if (prevOperator)
            self.display(sum);

        // Do calculation even wala gi pindot ang equal sign
        prevOperator = (button === "=") ? null : button;
        // Show result/data from buttons
        self.isShowingResult(true);
    };


    // Clear Calculations
    self.clear = function () {
        prevOperator = null;
        self.clearDisplay();
        sum = 0;
    };

    // Clear Display
    self.clearDisplay = function () {
        self.display("0");
    };
};

// Call the Knockout Bindings
ko.applyBindings(new Calculator());

//Keyboard Control
(function () {
    // Key codes and Calculator buttons
    var calculatorKeys = {
        48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6",
        55: "7", 56: "8", 57: "9", 106: "x", 107: "+", 109: "-", 
        110: ".", 111: "÷", 13: "=", 67: "c"
    };



    // Callback for every key stroke
    var keycallback = function (e) {
        // Check if the key was one of our calculator keys
        if (e.keyCode in calculatorKeys) {
            // Get button-element associated with key
            var element = document.getElementById("calculator-button-" + calculatorKeys[e.keyCode]);
            // Simulate button click on keystroke
            addClass(element, "active");
            setTimeout(function () { removeClass(element, "active"); }, 100);
        }
    }

    // Keyup event listener
    if (document.addEventListener) {
        document.addEventListener('keyup', keycallback, false);
    } else if (document.attachEvent) {
        document.attachEvent('keyup', keycallback);
    }
})();
