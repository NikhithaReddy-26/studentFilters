const data = [
    {id: 0, name: "Janu", English: 50, Maths: 86, Science: 77, SocialScience: 88},
    {id: 1, name: "Thanu", English: 75, Maths: 96, Science: 67, SocialScience: 91},
    {id: 2, name: "Tara", English: 90, Maths: 35, Science: 86, SocialScience: 100},
    {id: 3, name: "Glen", English: 79, Maths: 68, Science: 77, SocialScience: 78},
    {id: 4, name: "Zara", English: 80, Maths: 85, Science: 96, SocialScience: 68}
];

let filteredData = [...data];
let currentSortColumn = -1;
let ascending = true;

const subjectDropdown = document.getElementById("subject");
const filterButtons = document.querySelectorAll("input[name='filterCondition']");
const valueInput = document.getElementById("valueInput");
const minValueInput = document.getElementById("minValue");
const maxValueInput = document.getElementById("maxValue");
const applyFilterButton = document.getElementById("applyFilter");
const clearFilterButton = document.getElementById("clearFilter");
const studentTableBody = document.querySelector("#studentTable tbody");
const subjectHeaders = {
    English: document.getElementById("englishHeader"),
    Maths: document.getElementById("mathsHeader"),
    Science: document.getElementById("scienceHeader"),
    SocialScience: document.getElementById("socialScienceHeader")
};
const showAllData = () => {
    studentTableBody.innerHTML = "";
    filteredData.forEach((student, index) => {
        const row = document.createElement("tr");
        const columns = [
            index + 1,  
            student.name,  
            student.English,  
            student.Maths,  
            student.Science,  
            student.SocialScience 
        ];
        row.innerHTML = `
            <td>${columns[0]}</td>
            <td>${columns[1]}</td>
            <td>${columns[2]}</td>
            <td>${columns[3]}</td>
            <td>${columns[4]}</td>
            <td>${columns[5]}</td>
        `;
        
        studentTableBody.appendChild(row);
    });
};

const onSubjectChange = () => {
    const selectedSubject = subjectDropdown.value;
    if (selectedSubject === "") {
        showAllData();
        return;
    }

    Object.values(subjectHeaders).forEach(header => header.style.display = "none");
    showAllData();
    subjectHeaders[selectedSubject].style.display = "table-cell";
    showFilteredData();
};

const filterDataBySubject = (subject) => {
    const condition = document.querySelector("input[name='filterCondition']:checked")?.value;
    const value = valueInput.value;
    const minValue = minValueInput.value;
    const maxValue = maxValueInput.value;

    filteredData = data.map(student => ({ ...student, matchesFilter: false }));

    filteredData = filteredData.filter(student => {
        let isMatch = false;
        const score = student[subject];

        if (condition === "above" && score > value) {
            isMatch = true;
        } else if (condition === "below" && score < value) {
            isMatch = true;
        } else if (condition === "between" && score >= minValue && score <= maxValue) {
            isMatch = true;
        } else if (!condition) {
            isMatch = true;
        }

        if (isMatch) {
            student.matchesFilter = true;
        }

        return isMatch;
    });

    showFilteredData();
};

const showFilteredData = () => {
    studentTableBody.innerHTML = "";

    filteredData.forEach((student, index) => {
        const row = document.createElement("tr");
        if (student.matchesFilter) {
            row.classList.add("highlight");
        }

        const columns = [
            index + 1,  
            student.name, 
            student.English,  
            student.Maths,  
            student.Science, 
            student.SocialScience 
        ];
        const selectedSubject = subjectDropdown.value;
        const selectedSubjectIndex = {
            English: 2,
            Maths: 3,
            Science: 4,
            SocialScience: 5
        }[selectedSubject];
        const visibleColumns = [0, 1, selectedSubjectIndex];
        visibleColumns.forEach(colIndex => {
            const cell = document.createElement("td");
            cell.textContent = columns[colIndex];
            row.appendChild(cell);
        });

        studentTableBody.appendChild(row);
    });
};
const applyFilter = () => {
    const selectedSubject = subjectDropdown.value;
    filterDataBySubject(selectedSubject);
};
const clearFilter = () => {
    valueInput.value = "";
    minValueInput.value = "";
    maxValueInput.value = "";
    subjectDropdown.value = ""; 

    filteredData = [...data]; 
    Object.values(subjectHeaders).forEach(header => header.style.display = "table-cell");
    showAllData();
};

filterButtons.forEach(button => {
    button.addEventListener("change", () => {
        if (button.value === "between") {
            document.getElementById("betweenInputs").classList.remove("hidden");
            document.getElementById("singleValueInput").classList.add("hidden");
        } else {
            document.getElementById("betweenInputs").classList.add("hidden");
            document.getElementById("singleValueInput").classList.remove("hidden");
        }
    });
});

onSubjectChange();
showAllData();
