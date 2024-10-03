// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Dropdown, Table } from 'react-bootstrap';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// const EmployeePerformance = () => {
//   const [designations, setDesignations] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [selectedDesignation, setSelectedDesignation] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
//   const [selectedId, setSelectedId] = useState();
//   const [performanceData, setPerformanceData] = useState([]);
//   const [feedbackData, setFeedbackData] = useState([]);
//   const [courses, setCourses] = useState([]);

//   const token = localStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchData = async () => {
//       if (token) {
//         try {
//           // Fetch designations
//           const employeeResponse = await axios.get(`http://localhost:8000/api/admin/users/employee`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setEmployees(employeeResponse.data.employees);
//           setDesignations(Array.from(new Set(employeeResponse.data.employees.map(emp => emp.designation))));

//           // Fetch courses
//           const coursesResponse = await axios.get(`http://localhost:8000/api/allcourses`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setCourses(coursesResponse.data);

//         } catch (error) {
//           console.error('Error fetching data', error);
//         }
//       }
//     };

//     fetchData();
//   }, [token]);

//   const handleDesignationChange = (designation) => {
//     setSelectedDesignation(designation);
//     setSelectedEmployee('');
//     setSelectedEmployeeId(''); // Reset employee ID on designation change
//   };

//   const handleEmployeeChange = (employee) => {
//     setSelectedEmployee(employee.name); // Store the employee name
//     setSelectedEmployeeId(employee.employeeID); 
//     setSelectedId(employee.id)// Store the employee ID
//   };

//   const fetchPerformanceData = async () => {
//     if (selectedEmployeeId) {
//       try {
//         const performanceResponse = await axios.get(`http://localhost:8000/api/performance`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const employeePerformance = performanceResponse.data.filter(performance => performance.employeeID === selectedId);

//         setPerformanceData(employeePerformance);

//         const feedbackResponse = await axios.get(`http://localhost:8000/api/feedback/feedback`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const employeeFeedback = feedbackResponse.data.feedbacks.filter(feedback => feedback.name === selectedEmployee);
//         setFeedbackData(employeeFeedback);
//       } catch (error) {
//         console.error('Error fetching performance or feedback data', error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchPerformanceData();
//   }, [selectedEmployeeId]);

//   const pieData = feedbackData.map(feedback => ({
//     name: feedback.name,
//     value: feedback.aggregatedScore,
//   }));

//   const barChartData = courses
//     .filter(course => course.designation === selectedDesignation)
//     .map(course => {
//       const performance = performanceData.find(perf => perf.courseID === course.id);
//       return {
//         course: course.title,
//         score: performance ? performance.score : 0,
//       };
//     });

//   return (
//     <div className="mt-4">
//       <h2 className='mb-4' style={{color:'#6C63FF', fontWeight:'600'}}>Employee Performance:</h2>
//       <div className="d-flex mb-5">
//         <Dropdown className="mx-2">
//           <Dropdown.Toggle id="dropdown-basic">
//             {selectedDesignation || "Select Designation"}
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {designations.map((designation, index) => (
//               <Dropdown.Item key={index} onClick={() => handleDesignationChange(designation)}>
//                 {designation}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//         <Dropdown className="mx-2">
//           <Dropdown.Toggle id="dropdown-basic">
//             {selectedEmployee || "Select Employee"}
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {employees.filter(emp => emp.designation === selectedDesignation).map((emp, index) => (
//               <Dropdown.Item key={index} onClick={() => handleEmployeeChange(emp)}>
//                 {emp.name}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       {selectedEmployee && (
//         <div className='row'>
//             <div className='col-6'>
//             <h3>Performance History</h3>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Course</th>
//                 <th>Score</th>
//                 <th>Time</th>
//                 <th>Attempt</th>
//               </tr>
//             </thead>
//             <tbody>
//               {performanceData.map(performance => (
//                 <tr key={performance.course}>
//                   <td>{performance.course}</td>
//                   <td>{performance.score}</td>
//                   <td>{performance.time}</td>
//                   <td>{performance.attempt}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//             </div>
//             <div className='col-6'>

//             </div>

//             <div className='row mt-4'>
//                 <div className='col-6'>
//                 <h3>Feedback Scores</h3>
//           <PieChart width={400} height={300}>
//             <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.value > 50 ? '#82ca9d' : '#ff4444'} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//                 </div>
//                 <div className='col-6'>
//                 <h3>Course Marks</h3>
//           <BarChart width={600} height={300} data={barChartData}>
//             <XAxis dataKey="course" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="score" fill="#8884d8" />
//           </BarChart>
//                 </div>
//         </div>
//             </div>
//       )}
//     </div>
//   );
// };

// export default EmployeePerformance;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown, Table, Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const EmployeePerformance = () => {
  const [designations, setDesignations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedId, setSelectedId] = useState();
  const [performanceData, setPerformanceData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [uniqueCoursesAttended, setUniqueCoursesAttended] = useState(0);
  const [totalCoursesInDesignation, setTotalCoursesInDesignation] = useState(0);
  const [topCourse, setTopCourse] = useState({ course: '', score: 0 });

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          // Fetch designations
          const employeeResponse = await axios.get(`http://localhost:8000/api/admin/users/employee`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEmployees(employeeResponse.data.employees);
          setDesignations(Array.from(new Set(employeeResponse.data.employees.map(emp => emp.designation))));

          // Fetch courses
          const coursesResponse = await axios.get(`http://localhost:8000/api/allcourses`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCourses(coursesResponse.data);

        } catch (error) {
          console.error('Error fetching data', error);
        }
      }
    };

    fetchData();
  }, [token]);

  const handleDesignationChange = (designation) => {
    setSelectedDesignation(designation);
    setSelectedEmployee('');
    setSelectedEmployeeId(''); // Reset employee ID on designation change
  };

  const handleEmployeeChange = (employee) => {
    setSelectedEmployee(employee.name); // Store the employee name
    setSelectedEmployeeId(employee.employeeID); 
    setSelectedId(employee.id); // Store the employee ID
  };

  const fetchPerformanceData = async () => {
    if (selectedEmployeeId) {
      try {
        const performanceResponse = await axios.get(`http://localhost:8000/api/performance`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const employeePerformance = performanceResponse.data.filter(performance => performance.employeeID === selectedId);
        setPerformanceData(employeePerformance);

        const feedbackResponse = await axios.get(`http://localhost:8000/api/feedback/feedback`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const employeeFeedback = feedbackResponse.data.feedbacks.filter(feedback => feedback.name === selectedEmployee);
        setFeedbackData(employeeFeedback);

        // Calculate unique courses attended by the employee
        const uniqueCourses = new Set(employeePerformance.map(performance => performance.courseID)).size;
        setUniqueCoursesAttended(uniqueCourses);

        // Calculate total courses for the selected designation
        const totalCourses = courses.filter(course => course.designation === selectedDesignation).length;
        setTotalCoursesInDesignation(totalCourses);

        // Calculate top mark and the corresponding course
        if (employeePerformance.length > 0) {
          const topPerformance = employeePerformance.reduce((top, current) =>
            current.score > top.score ? current : top
          );
          const topCourseTitle = courses.find(course => course.id === topPerformance.courseID)?.title || '';
          setTopCourse({ course: topCourseTitle, score: topPerformance.score });
        }

      } catch (error) {
        console.error('Error fetching performance or feedback data', error);
      }
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, [selectedEmployeeId]);

  const pieData = feedbackData.map(feedback => ({
    name: feedback.name,
    value: feedback.aggregatedScore,
  }));

  const barChartData = courses
    .filter(course => course.designation === selectedDesignation)
    .map(course => {
      const performance = performanceData.find(perf => perf.courseID === course.id);
      return {
        course: course.title,
        score: performance ? performance.score : 0,
      };
    });

  return (
    <div className="mt-4">
      <h2 className='mb-4' style={{color:'#6C63FF', fontWeight:'600'}}>Employee Performance:</h2>
      <div className="d-flex mb-5">
        <Dropdown className="mx-2">
          <Dropdown.Toggle id="dropdown-basic">
            {selectedDesignation || "Select Designation"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {designations.map((designation, index) => (
              <Dropdown.Item key={index} onClick={() => handleDesignationChange(designation)}>
                {designation}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mx-2">
          <Dropdown.Toggle id="dropdown-basic">
            {selectedEmployee || "Select Employee"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {employees.filter(emp => emp.designation === selectedDesignation).map((emp, index) => (
              <Dropdown.Item key={index} onClick={() => handleEmployeeChange(emp)}>
                {emp.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {selectedEmployee && (
        <div className='row'>
            <div className='col-6'>
              <h3>Performance History</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Score</th>
                    <th>Time</th>
                    <th>Attempt</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map(performance => (
                    <tr key={performance.course}>
                      <td>{performance.course}</td>
                      <td>{performance.score}</td>
                      <td>{performance.time}</td>
                      <td>{performance.attempt}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className='col-6'>
                <div className='row'>
                    <div className='col-6'>
                    <Card className="mb-4 px-5 pt-4 pb-5">
                <Card.Body className='p-0'>
                <Card.Title className='content'>Total Courses Attended:</Card.Title>
                  <Card.Text className='fw-600 fs-1 content'>{uniqueCoursesAttended}/{totalCoursesInDesignation}</Card.Text>
                </Card.Body>
              </Card>
                    </div>
                    <div className='col-6 '>
                    <Card className="mb-4 px-5 pt-4 pb-5">
                <Card.Body className='p-0'>
                  <Card.Title className='content'>Top Mark</Card.Title>
                  <Card.Text className='fw-600 fs-1 content'>{topCourse.course}: {topCourse.score}</Card.Text>
                </Card.Body>
              </Card>  
                    </div>
                </div>
            </div>
        </div>
      )}
      
      {selectedEmployee && (
        <div className='row mt-4'>
          <div className='col-6'>
            <h3>Feedback Scores</h3>
            <PieChart width={400} height={300}>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#6C63FF">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 50 ? '#6C63FF' : '#363188'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className='col-6'>
            <h3>Course Marks</h3>
            <BarChart width={600} height={300} data={barChartData}>
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#6C63FF" />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePerformance;
