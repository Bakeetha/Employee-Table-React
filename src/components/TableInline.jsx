import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import AlertDialog from './AlertDialog';


export default function TableInline() {
    const [employees, setEmployees] = useState([
        { emp_id: 1, name: 'Felix', designation: 'Software Engineer', salary: 60000 },
        { emp_id: 2, name: 'Esthel', designation: 'Project Manager', salary: 75000 },
        { emp_id: 3, name: 'Aira', designation: 'Project Lead', salary: 75000 },
      ]);
    
      const [editEmployeeId, setEditEmployeeId] = useState(null);
      const [editFormData, setEditFormData] = useState({
        name: '',
        designation: '',
        salary: '',
      });
      const [dialogOpen, setDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log({ name, value });
        setEditFormData({ ...editFormData, [name]: value });
      };
    
      const handleEditClick = (employee) => {
        setEditEmployeeId(employee.emp_id);
        setEditFormData({ 
            name: employee.name, 
            designation: employee.designation, 
            salary: employee.salary 
        });
      };
    
      const handleCancelClick = () => {
        setEditEmployeeId(null);
        setEditFormData({ 
            name: '', 
            designation: '', 
            salary: '' 
        });
      };
    
      const handleSaveClick = (emp_id) => {
        setEmployees(employees.map(employee =>
          employee.emp_id === emp_id ? { ...employee, ...editFormData } : employee
        ));
        setEditEmployeeId(null);
        setEditFormData({ 
            name: '', 
            designation: '', 
            salary: '' 
        });
      };
    
    //   const addEmployee = () => {
    //     setEmployees([...employees, { ...editFormData, emp_id: employees.length + 1 }]);
    //     setEditFormData({ 
    //         name: '', 
    //         designation: '', 
    //         salary: '' 
    //     });
    //   };

      // const addEmployee = () => {
      //   setEmployees([...employees, 
      //     { 
      //       emp_id: employees.length + 1, 
      //       name: '', 
      //       designation: '', 
      //       salary: '' 
      //     }
      //   ]);
      // };
      const addEmployee = () => {
        const newEmployee = {
          emp_id: employees.length + 1,
          name: '',
          designation: '',
          salary: ''
        };
        setEmployees([...employees, newEmployee]);
        setEditEmployeeId(newEmployee.emp_id);
        setEditFormData({
          name: '',
          designation: '',
          salary: ''
        });
      };

    
      // const deleteEmployee = (emp_id) => {
      //   setDialogOpen(true);
      //   if(dialogOpen) {
      //     setEmployees(employees.filter(employee => employee.emp_id !== emp_id));
      //     // setDialogOpen(false);
      //   }
      // };

      const openDeleteDialog = (emp_id) => {
        setEmployeeToDelete(emp_id);
        setDialogOpen(true);
      };
    
      const handleCloseDialog = () => {
        setDialogOpen(false);
        setEmployeeToDelete(null);
      };
    
      const handleConfirmDelete = () => {
        setEmployees(employees.filter(employee => employee.emp_id !== employeeToDelete));
        setDialogOpen(false);
        setEmployeeToDelete(null);
      };

    
      return (
        <div className="w-full text-center items-center justify-center ">
          <h1 className='text-3xl text-center mt-6 font-bold mb-6 text-red-800'>Employee Table</h1>
          <span>
            <h2 className='text-2xl  mt-6 px-3 font-semibold text-blue-700'>
                Add New Employee: 
                <button className="rounded-md cursor-pointer bg-blue-700 text-white p-1" 
                onClick={addEmployee}>+</button></h2>
          </span>          
          <table className="w-[85%] border border-gray-800 m-5 
          text-center items-center justify-center">
            <thead >
              <tr>
                <th className="border border-gray-800 ">Emp ID</th>
                <th className="border border-gray-800 ">Name</th>
                <th className="border border-gray-800 ">Designation</th>
                <th className="border border-gray-800 ">Salary</th>
                <th className="border border-gray-800 ">Actions</th>
              </tr>
            </thead>
            <tbody className="border border-gray-600">
              {employees.map((employee) => (
                <tr key={employee.emp_id} className='border border-gray-800 '>
                  <td className="border border-gray-800 ">{employee.emp_id}</td>
                  <td className="border border-gray-800 ">
                    {editEmployeeId === employee.emp_id ? (
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleInputChange}
                        className='border-none text-center focus:border-none active:border-none'
                      />
                    ) : (
                      employee.name
                    )}
                  </td>
                  <td className="border border-gray-800 ">
                    {editEmployeeId === employee.emp_id ? (
                      <input
                        type="text"
                        name="designation"
                        value={editFormData.designation}
                        onChange={handleInputChange}
                        className='border-none text-center focus:border-none'
                      />
                    ) : (
                      employee.designation
                    )}
                  </td>
                  <td className="border border-gray-800 ">
                    {editEmployeeId === employee.emp_id ? (
                      <input
                        type="number"
                        name="salary"
                        value={editFormData.salary}
                        onChange={handleInputChange}
                        className='border-none text-center focus:border-none'
                      />
                    ) : (
                      employee.salary
                    )}
                  </td>
                  <td  className='flex text-center items-center justify-center'>
                    {editEmployeeId === employee.emp_id ? (
                      <>
                        <FaSave className='text-green-600'
                        onClick={() => handleSaveClick(employee.emp_id)} 
                        style={{ cursor: 'pointer', marginRight: '10px' }} />
                        <FaTimes className='text-red-600'
                        onClick={handleCancelClick} 
                        style={{ cursor: 'pointer' }} />
                      </>
                    ) : (
                      <>
                        <FaEdit className='text-blue-600'
                        onClick={() => handleEditClick(employee)} 
                        style={{ cursor: 'pointer', marginRight: '10px' }} />
                        <FaTrashAlt className='text-red-600'
                        //  onClick={() => deleteEmployee(employee.emp_id)} 
                         onClick={() => openDeleteDialog(employee.emp_id)}
                         style={{ cursor: 'pointer' }} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AlertDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
          {/* <h2>Add New Employee</h2>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editFormData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={editFormData.designation}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={editFormData.salary}
              onChange={handleInputChange}
            />
            <button onClick={addEmployee}>Add Employee</button>
          </div> */}
        </div>
      );
}
