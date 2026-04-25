const testAPI = async () => {
  const baseUrl = 'http://localhost:5000/api';
  let token;
  let certId;
  let milestoneId;
  
  const log = (msg, res, data) => {
    console.log(`\n=== ${msg} ===`);
    console.log(`Status: ${res.status}`);
    console.log(data);
  };

  try {
    // 1. Register User
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: `test${Date.now()}@example.com`, password: 'password123' })
    });
    const regData = await regRes.json();
    log('Register User', regRes, regData);
    token = regData.data.token;

    // 2. Get Me
    const meRes = await fetch(`${baseUrl}/auth/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    log('Get Me', meRes, await meRes.json());

    // 3. Create Certification
    const createCertRes = await fetch(`${baseUrl}/certifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        title: 'AWS Certified Solutions Architect',
        provider: 'AWS',
        progress: 10,
        milestones: [{ title: 'Finish Module 1', completed: false }]
      })
    });
    const createCertData = await createCertRes.json();
    log('Create Certification', createCertRes, createCertData);
    certId = createCertData.data._id;
    milestoneId = createCertData.data.milestones[0]._id;

    // 4. Update Progress
    const progressRes = await fetch(`${baseUrl}/certifications/${certId}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ progress: 50 })
    });
    log('Update Progress', progressRes, await progressRes.json());

    // 5. Mark Milestone Complete
    const milestoneRes = await fetch(`${baseUrl}/certifications/${certId}/milestones/${milestoneId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ completed: true })
    });
    log('Mark Milestone Complete', milestoneRes, await milestoneRes.json());

    // 6. Get All Certifications
    const getCertsRes = await fetch(`${baseUrl}/certifications`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    log('Get All Certifications', getCertsRes, await getCertsRes.json());

    console.log('\nAll tests passed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testAPI();
