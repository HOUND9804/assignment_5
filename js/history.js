        const selfBalance = document.getElementById('balance');
        const donationHistoryList = document.getElementById('donation_history');
        const historySection = document.getElementById('history_section');
        let donationHistory = []; // Array to store donation records

        function processDonation(inputField, amountField, donationType) {
            const donationInput = document.getElementById(inputField);
            const donationAmount = parseFloat(donationInput.value);
            const currentBalance = parseFloat(selfBalance.textContent);
            if (donationAmount > 0 && donationAmount<=currentBalance) {
                // Update balance and donation amount
                selfBalance.textContent = (currentBalance - donationAmount).toFixed(2) + ' BDT';

                const amountElement = document.getElementById(amountField);
                amountElement.textContent = (parseFloat(amountElement.textContent) + donationAmount).toFixed(2) + ' BDT';

                // Record the donation with the current date and time
                const now = new Date();
                donationHistory.push({
                    type: donationType,
                    amount: donationAmount,
                    time: now.toLocaleString() 
                });
                updateDonationHistory();

                
                document.getElementById('my_modal_success').showModal();
            } else {
             
                document.getElementById('my_modal_failure').showModal();
            }

            donationInput.value = '';
        }

        function updateDonationHistory() {
            donationHistoryList.innerHTML = ''; // Clear previous history
            donationHistory.forEach(donation => {
                const listItem = document.createElement('li');
                listItem.textContent = `Donated ${donation.amount} BDT for ${donation.type} on ${donation.time}`;
                donationHistoryList.appendChild(listItem);
            });
            historySection.classList.remove('hidden'); // Show the history section
        }

        document.getElementById('noakhali_btn').addEventListener('click', function() {
            processDonation('noakhali_don', 'noakhali_amount', 'Flood at Noakhali');
        });

        document.getElementById('feni_btn').addEventListener('click', function() {
            processDonation('feni_don', 'feni_amount', 'Flood Relief in Feni');
        });

        document.getElementById('student_btn').addEventListener('click', function() {
            processDonation('student_don', 'student_amount', 'Aid for Injured in Quota Movement');
        });

        // Close modals with ESC key
        document.addEventListener('keydown', function (event) {
            if (event.key === "Escape") {
                const successModal = document.getElementById('my_modal_success');
                const failureModal = document.getElementById('my_modal_failure');
                if (successModal.open) successModal.close();
                if (failureModal.open) failureModal.close();
            }
        });

        // Donation and History Button Logic
        const donationButton = document.getElementById('donation_btn');
        const historyButton = document.getElementById('history_btn');
        const donateCards = document.querySelector('.cards');

        donationButton.addEventListener('click', function () {
            donationButton.classList.remove('bg-white');
            donationButton.classList.add('bg-green-300');
            historyButton.classList.remove('bg-green-300');
            historyButton.classList.add('bg-white');
            donateCards.classList.remove('hidden'); 
        });

        historyButton.addEventListener('click', function () {
            historyButton.classList.remove('bg-white');
            historyButton.classList.add('bg-green-300');
            donationButton.classList.remove('bg-green-300');
            donationButton.classList.add('bg-white');
            donateCards.classList.add('hidden'); 
        });