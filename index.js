import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="mx-auto py-10 px-4 sm:px-6 md:px-8 lg:px-10">
      <header class="pt-10 pb-5 text-center">
        <div class="flex flex-col items-center">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Teknetwork
          </h1>
          <p class="text-white text-lg sm:text-xl md:text-xl py-3 max-w-2xl text-zinc-200">A curated collection of epitech computer science student websites</p>
        </div>
      </header>
      <section class="flex items-center justify-center w-full">
        <input type="text" class="input sticky bg-[#1E2836] text-white h-11 w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg placeholder-gray-500 border border-[#374151] focus:border-sky-600 focus:outline-none px-3" placeholder="Search by name, website or graduation year...">
      </section>
   
      <section id="students" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16 w-full max-w-4xl mx-auto"> </section>

    </div>
    <button class="btnSubmit flex items-center gap-1 left-1/2 -translate-x-1/2 z-50  bottom-8 fixed z-0 h-12 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500 cursor-pointer">Add your profil<span><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span></button>
  </div>
`

const input = document.querySelector(".input");
const container = document.getElementById("students");
const btnSubmit = document.querySelector(".btnSubmit");
let students = [];

btnSubmit.addEventListener("click", () => {
  const url = "https://github.com/erenworld/teknetwork";
  window.open(url, "_blank")
})

async function loadStudents() {
  const response = await fetch("/students.json");
  students = await response.json();
  displayStudents(students);
}

function displayStudents(filteredStudents) {
  container.innerHTML = filteredStudents.map((student) => {
    const query = input.value.trim().toLowerCase();
    const name = student.name;
    const highlightedName = query && name.toLowerCase().includes(query) 
    ? name.replace(new RegExp(`(${query})`, "gi"), '<span class="highlight">$1</span>')
    : name;

    return `
    <div class="bg-[#1E2836] p-9 py-5 px-4 rounded-lg border border-[#374151]">
        <div class="flex items-center justify-between text-white">
            <p class="pb-2">${highlightedName}</p>
            <span>${student.year}</span>
        </div>
        <a href="https://${student.domain}" target="_blank" class="text-blue-300 hover:underline">${student.domain}</a>
    </div>
    `
  }).join("");
}

input.addEventListener("input", () => {
  const query = input.value.trim().toLowerCase();
  const filteredStudents = students.filter((student) => 
    student.name.toLowerCase().includes(query) || 
    student.domain.toLowerCase().includes(query) ||
    student.year.toString().includes(query)
  );
  displayStudents(filteredStudents);
})

loadStudents();

