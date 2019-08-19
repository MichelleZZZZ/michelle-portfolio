(function($){

	$.fn.formValidation = function(){
		
		return this.each(function(){

			var $form = $(this),
				$name = $form.find('#name'),
				$email = $form.find('#email'),
				$message = $form.find('#message'),
				$spam = $form.find('#spam'),
				$fields = $form.find('input, textarea'),
				$status = $form.find(".status"),
				action = $form.attr('action');

			function showMessage(message){
				$status.html(message).slideDown(300);
			}

			function hideMessage(){
				$status.slideUp(300);
			}

			function setError($element, message){
				$element.focus().addClass('error');
				showMessage(message);
			}

			function clearErrors(){
				$fields.removeClass('error');
			}

			function clearFields(){
				$fields.val("");
			}

			function isValidEmail(email) {
				var emailRx = /^[\w\.-]+@[\w\.-]+\.\w+$/;
				return  emailRx.test(email);
			}

			function sendEmail(){
				var formData = $form.serialize();
				$.post(action, formData, function(sent){
					if(sent==1){
						showMessage("Thanks "+$name.val()+", your message has been sent");
						clearFields();
					} else {
						showMessage("Sorry "+$name.val()+", there was a problem sending your message");
					}
				})
			}

			$form.submit(function(e){
				e.preventDefault();
				
				clearErrors();

				if($name.val()===""){

					setError($name, "Please enter your name");

				}else if(!isValidEmail($email.val())){

					setError($email, "Please enter a valid email");

				}else if($message.val()===""){

					setError($message, "Please enter your message");

				}else if($spam.val()!==""){

					setError($message, "Spam Attack");

				}else{
					showMessage("Email being sent...");
					sendEmail();
				}
			});

			$form.on('reset', function(){
				clearErrors();
				hideMessage();
			})

		})
	}

})(jQuery);