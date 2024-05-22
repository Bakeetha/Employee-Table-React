import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function Table() {
    const [employees, setEmployees] = useState([
        { emp_id: 1, name: 'Esthel', designation: 'Software Engineer', salary: 60000 },
        { emp_id: 2, name: 'Aira', designation: 'Project Manager', salary: 75000 },
      ]);
    
      const [newEmployee, setNewEmployee] = useState({
        emp_id: '',
        name: '',
        designation: '',
        salary: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
      };
    
      const addEmployee = () => {
        setEmployees([...employees, { ...newEmployee, emp_id: employees.length + 1 }]);
        setNewEmployee({ emp_id: '', name: '', designation: '', salary: '' });
      };
    
      const deleteEmployee = (emp_id) => {
        setEmployees(employees.filter(employee => employee.emp_id !== emp_id));
      };
    
      const editEmployee = (emp_id) => {
        const editedName = prompt('Enter new name:');
        const editedDesignation = prompt('Enter new designation:');
        const editedSalary = prompt('Enter new salary:');
        setEmployees(employees.map(employee =>
          employee.emp_id === emp_id ? {
            ...employee,
            name: editedName,
            designation: editedDesignation,
            salary: editedSalary,
          } : employee
        ));
  return (
    <div>Table</div>
  )
}

return (
  <div className="container">
    <h1>Employee Table</h1>
    <table border="1">
      <thead>
        <tr>
          <th>Emp ID</th>
          <th>Name</th>
          <th>Designation</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.emp_id}>
            <td>{employee.emp_id}</td>
            <td>{employee.name}</td>
            <td>{employee.designation}</td>
            <td>{employee.salary}</td>
            <td>
              <FaEdit onClick={() => editEmployee(employee.emp_id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
              <FaTrashAlt onClick={() => deleteEmployee(employee.emp_id)} style={{ cursor: 'pointer' }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <h2>Add New Employee</h2>
    <div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newEmployee.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="designation"
        placeholder="Designation"
        value={newEmployee.designation}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={newEmployee.salary}
        onChange={handleInputChange}
      />
      <button onClick={addEmployee}>Add Employee</button>
    </div>
  </div>
);
};