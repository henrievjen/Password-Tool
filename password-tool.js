$(document).ready(function() {
    
    $('.start').show(500);
    
    $('#back-button').click(function() {
       
        $('.start').show();
        $('.password-generator').css("visibility", "hidden");
        $('.password-strength-checker').css("visibility", "hidden");
        $('#back-button').hide();
        $('#required').css("visibility", "hidden");
        $('#ask').val("");
        $('#password').val("");
		$(document).scrollTop(0);
        
    });
    
    $('.password-generator-button').click(function() {
       
        $('.start').hide();
        $('.password-generator').css("visibility", "visible");
        $('#back-button').show();
		$('#ask').select();
		$(document).scrollTop(0);
        
    });
    
    $('.password-strength-button').click(function() {
       
        $('.start').hide();
        $('.password-strength-checker').css("visibility", "visible");
        $('#back-button').show();
        $('#password-check').select();
		$(document).scrollTop(0);
        
    });
    
    
    $('#ask').keyup(function(event) {
        if (event.keyCode === 13) {
            $('#button').click();
        }
    });
   
   let lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
   let upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
   let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
   let symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "|", "]", "}", "[", "{", "'", ";", ":", "/", "?", ".", ">", ",", "<"];
   
   
   $('#button').click(function() {
       
      // Hides keyboard when click enter (or go) on mobile version 
      $('#ask').blur(); 
       
      let passwordLength = parseInt($('#ask').val().trim());
      
      if(isNaN(passwordLength) || passwordLength === "" || passwordLength < 8 || passwordLength > 32)
      {
          $('#required').css("visibility", "visible");
		  $('#ask').select();
      }
      else
      {
          $('#required').css("visibility", "hidden");
          var password = ""; 
		  
          for(let i = 0; i < passwordLength; i++)
          {
            
			  let randomArrNum = Math.round(Math.random() * 3);
			  
			  // Function to choose random Character to add to password
			  let randomChar = (num, type) => {
				  if(randomArrNum === num)
				  {
					  let randomLetterNum = Math.round(Math.random() * (type.length - 1));
					  password += type[randomLetterNum];
				  }
				  
			  }
			  
		  randomChar(0, lowerCase);
		  randomChar(1, upperCase);
		  randomChar(2, numbers);
		  randomChar(3, symbols);
		  
          }
          
          $('#password').val(password);
          
      }
       
   });
   
   
   $('#copy').click(function() {
       
       if($('#password').val().length !== 0)
       {
            $('#password').select();
            document.execCommand("copy");
            $('#copied').css("visibility", "visible");
            
            setTimeout(function() {
                $('#copied').css("visibility", "hidden");
            }, 1000);
       }
       
   });
   
   
   // Check Password Strength
   $('#password-check').keyup(function(event) {
        if (event.keyCode > 0) {
            
            let progressLength = 0;
            let progressLowerCase = 0;
            let progressUpperCase = 0;
            let progressNumbers = 0;
            let progressSymbols = 0;
            
            let text = $('#password-check').val().split("");
            
            if(text.length > 7)
            {
                progressLength = 4;
            }
            else if(text.length > 5)
            {
                progressLength = 3;
            }
            else if(text.length > 3)
            {
                progressLength = 2;
            }
            else if(text.length > 1)
            {
                progressLength = 1;
            }
            else if(text.length <= 1)
            {
                progressLength = 0;
            }
		

            for(i = 0; i < text.length; i++)
            {
                if(lowerCase.includes(text[i]))
                {
                    progressLowerCase = 1;
                }
                if(upperCase.includes(text[i]))
                {
                    progressUpperCase = 1;
                }
                if(numbers.includes(text[i]))
                {
                    progressNumbers = 1;
                }
                if(symbols.includes(text[i]))
                {
                    progressSymbols = 1;
                }
            }
            
            $('#check-progress').val(progressLength + progressLowerCase + progressUpperCase + progressNumbers + progressSymbols);
            
                // Strength Indicator
                if($('#check-progress').val() > 7)
                {
                    $('#strength-indicator').css("color", "#0f0");
                    $('#strength-indicator').text("Great Password!");
                    $('#strength-indicator').show();
                }
                else if($('#check-progress').val() > 5)
                {
                    $('#strength-indicator').css("color", "#008000");
                    $('#strength-indicator').text("Good Password!");
                    $('#strength-indicator').show();
                }
                else if($('#check-progress').val() > 3)
                {
                    $('#strength-indicator').css("color", "#000");
                    $('#strength-indicator').text("OK Password!");
                    $('#strength-indicator').show();
                }
                else if($('#check-progress').val() > 1)
                {
                    $('#strength-indicator').css("color", "#f00");
                    $('#strength-indicator').text("Password needs to be stronger");
                    $('#strength-indicator').show();
                }
                else if($('#check-progress').val() < 1)
                {
                    $('#strength-indicator').hide();
                }
        }
    });
   
});