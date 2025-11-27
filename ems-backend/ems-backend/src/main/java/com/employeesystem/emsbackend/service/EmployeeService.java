package com.employeesystem.emsbackend.service;

import com.employeesystem.emsbackend.entity.Employee;
import com.employeesystem.emsbackend.exception.ResourceNotFoundException;
import com.employeesystem.emsbackend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // ✅ CREATE
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // ✅ READ BY ID (FIXED EXCEPTION)
    public Employee findEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee Id " + employeeId + " not found")
                );
    }

    // ✅ READ ALL
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    // ✅ UPDATE
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee emp = findEmployeeById(id);
        emp.setFirstName(updatedEmployee.getFirstName());
        emp.setLastName(updatedEmployee.getLastName());
        emp.setEmail(updatedEmployee.getEmail());
        return employeeRepository.save(emp);
    }

    // ✅ DELETE
    public void deleteEmployeeById(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found Id " + id);
        }
        employeeRepository.deleteById(id);
    }

    // ✅ FIND BY EMAIL
    public Employee findEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}
