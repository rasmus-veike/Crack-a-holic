document.addEventListener('DOMContentLoaded', function() {
    let selectedRating = 0;

   
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));

            
            document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));

          
            fillStars(selectedRating);
        });

      
        star.addEventListener('mouseover', function() {
            this.classList.add('hover');
          
            fillStars(parseInt(this.getAttribute('data-value')));
        });

        star.addEventListener('mouseout', function() {
            this.classList.remove('hover');
          
            fillStars(selectedRating);
        });
    });

    function fillStars(rating) {
        document.querySelectorAll('.star').forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    document.getElementById('submit-btn').addEventListener('click', function() {
        const group = document.getElementById('group-select').value;
        const course = document.getElementById('course-select').value;
        const description = document.getElementById('description').value;

        if (!group || !course || selectedRating === 0 || !description) {
            alert('Please complete all fields.');
            return;
        }

  
        const feedbackData = {
            group: group,
            course: course,
            rating: selectedRating,
            description: description
        };

    
        localStorage.setItem('feedback', JSON.stringify(feedbackData));

   
        showBonziMessage();
    });

    function showBonziMessage() {
        const messageBox = document.getElementById('bonzi-message');
        messageBox.style.display = 'block'; 
        messageBox.style.opacity = '1';
    
        
        setTimeout(() => {
            messageBox.style.opacity = '0'; 
            setTimeout(() => {
                messageBox.style.display = 'none'; 
            }, 500); 
        }, 3000);
    }
    

    
    document.querySelector('.start-button').addEventListener('click', function() {       
        
        setTimeout(() => {
            window.location.href = 'shutdown.html'; // start-button juhatab shutdown lehele
        }, 500); 
    });
});
