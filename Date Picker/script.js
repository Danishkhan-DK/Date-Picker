const dateInput = document.getElementById('date-input');
const calendarIcon = document.querySelector('.calendar-icon');
const calendar = document.getElementById('calendar');
const calendarDays = document.getElementById('calendar-days');
const monthYearSelect = document.getElementById('month-year-select');
const calendarMonthName = document.getElementById('calendar-month-name');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');

let selectedDate = new Date();
let currentYear = selectedDate.getFullYear();
let currentMonthIndex = selectedDate.getMonth();

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

dateInput.addEventListener('click', () => {
    calendar.style.display = calendar.style.display === 'block' ? 'none' : 'block';
    renderCalendar();
});

calendarIcon.addEventListener('click', () => {
    calendar.style.display = calendar.style.display === 'block' ? 'none' : 'block';
    renderCalendar();
});

prevMonth.addEventListener('click', () => {
    changeMonth(-1);
});

nextMonth.addEventListener('click', () => {
    changeMonth(1);
});

monthYearSelect.addEventListener('change', () => {
    const [month, year] = monthYearSelect.value.split(' ');
    currentMonthIndex = monthNames.indexOf(month);
    currentYear = parseInt(year, 10);
    renderCalendar();
});

function changeMonth(offset) {
    currentMonthIndex += offset;
    if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        currentYear--;
    } else if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
        currentYear++;
    }
    renderCalendar();
}

function renderCalendar() {
    monthYearSelect.value = `${monthNames[currentMonthIndex]} ${currentYear}`;
    calendarMonthName.textContent = monthNames[currentMonthIndex].toUpperCase();

    const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

    calendarDays.innerHTML = '';

    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.innerHTML += '<span></span>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('span');
        dayElement.textContent = day;
        dayElement.addEventListener('click', () => {
            selectedDate = new Date(currentYear, currentMonthIndex, day);
            dateInput.value = selectedDate.toDateString();
            calendar.style.display = 'none';
            highlightSelectedDate(dayElement);
        });
        calendarDays.appendChild(dayElement);
    }
}

function highlightSelectedDate(selectedElement) {
    const dayElements = calendarDays.getElementsByTagName('span');
    for (let dayElement of dayElements) {
        dayElement.classList.remove('selected');
    }
    selectedElement.classList.add('selected');
}

// function populateMonthYearSelect() {
//     const currentYear = new Date().getFullYear();
//     for (let year = currentYear - 100; year <= currentYear + 10; year++) {
//         monthNames.forEach((month) => {
//             const option = document.createElement('option');
//             option.value = `${month} ${year}`;
//             option.textContent = `${month} ${year}`;
//             monthYearSelect.appendChild(option);
//         });
//     }
// }

function populateMonthYearSelect() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 100; year <= currentYear + 10; year++) {
        monthNames.forEach((month) => {
            const option = document.createElement('option');
            let capitalizedMonth = month.toUpperCase(); 
            option.value = `${month} ${year}`;
            option.textContent = `${capitalizedMonth} ${year}`;
            monthYearSelect.appendChild(option);
        });
    }
}

populateMonthYearSelect();
renderCalendar();
