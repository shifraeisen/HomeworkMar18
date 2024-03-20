using HomeworkMar18.Data;
using HomeworkMar18.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;

namespace HomeworkMar18.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress; Initial Catalog=People;Integrated Security=True;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            var repo = new PeopleRepo(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }
        public IActionResult GetPersonByID(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            var person = repo.GetByID(id);
            return Json(person);
        }

        [HttpPost]
        public IActionResult AddPerson(Person p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Add(p);
            return Json(p);
        }
        [HttpPost]
        public IActionResult UpdatePerson(Person p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.UpdatePerson(p);
            var people = repo.GetAll();
            return Json(people);
        }
        [HttpPost]
        public IActionResult DeletePerson(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeletePerson(id);
            var people = repo.GetAll();
            return Json(people);
        }
    }
}