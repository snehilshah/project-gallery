import PasswordChangeForm from '../PasswordChangeForm';

function ResetPassword({ params }: { params: { token: string } }) {
  console.log(params.token);

  return (
    <div>
      <PasswordChangeForm token={params.token} />
    </div>
  );
}

export default ResetPassword;
