export default function IdolCircle({ idol }) {
  console.log(idol);
  const { profilePicture, name } = idol;
  console.log(profilePicture); //
  return <img src={profilePicture} alt={name} />;
}
