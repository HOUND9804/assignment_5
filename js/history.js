const donationButton = document.getElementById('donation_btn');
const historyButton = document.getElementById('history_btn');
const donateCards = document.querySelector('.cards');
const historySection = document.querySelector('.history_section');
const selfBalance = document.getElementById('balance');
let balanceAmount = parseInt(selfBalance.innerText.replace(' BDT', ''));

// Show donation cards and hide history section
donationButton.addEventListener('click', function () {
    donationButton.classList.remove('bg-white');
    donationButton.classList.add('bg-green-300');
    historyButton.classList.remove('bg-green-300');
    historyButton.classList.add('bg-white');
    donateCards.classList.remove('hidden');
    historySection.classList.add('hidden'); 
    console.log(historySection);
});

// Show history section and hide donation cards
historyButton.addEventListener('click', function () {
    historyButton.classList.remove('bg-white');
    historyButton.classList.add('bg-green-300');
    donationButton.classList.remove('bg-green-300');
    donationButton.classList.add('bg-white');
    donateCards.classList.add('hidden');
    historySection.classList.remove('hidden'); 
});

// Donation handling
function handleDonation(inputId, amountId, location) {
    const donationInput = document.getElementById(inputId).value;
    const donationAmount = parseInt(donationInput);
    if (donationAmount > 0 && donationAmount <= balanceAmount) {
        balanceAmount -= donationAmount;
        selfBalance.innerText = balanceAmount + ' BDT';
        document.getElementById(amountId).innerText = (parseInt(document.getElementById(amountId).innerText) + donationAmount) + ' BDT';
        addToHistory(location, donationAmount);
        document.getElementById('my_modal_success').showModal();
    } else {
        document.getElementById('my_modal_failure').showModal();
    }
    donationInput.value = ''; // Clear the input field
    donationInput.placeholder = 'Write Donation Amount'; // Reset the placeholder
}

// Add donation record to history
function addToHistory(location, amount) {
    const historyList = document.getElementById('donation_history');
    const listItem = document.createElement('li');
    const timestamp = new Date().toLocaleString();
    listItem.innerText = `${amount} BDT donated for ${location} on ${timestamp}`;
    historyList.appendChild(listItem);
}

// Event listeners for donation buttons
document.getElementById('noakhali_btn').addEventListener('click', function () {
    handleDonation('noakhali_don', 'noakhali_amount', 'Noakhali');
});

document.getElementById('feni_btn').addEventListener('click', function () {
    handleDonation('feni_don', 'feni_amount', 'Feni');
});

document.getElementById('student_btn').addEventListener('click', function () {
    handleDonation('student_don', 'student_amount', 'Student Aid');
});

// Navigate to Blog page
document.getElementById('blog').addEventListener('click', function() {
    window.location.href = 'blog.html'; 
});


