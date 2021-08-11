import ProfileForm from './profile-form';
import classes from './user-profile.module.css';


function UserProfile() {
  

 
  // Redirect away if NOT auth
async function onChangePassword(passwordData){
  const result = await fetch('api/user/change-password',{
    method:"PATCH",
    body:JSON.stringify(passwordData),
    headers:{
      "Content-type":'application/json'
    }

  })
  const data = await result.json();
  console.log(data)
}
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={onChangePassword}/>
    </section>
  );
}

export default UserProfile;
