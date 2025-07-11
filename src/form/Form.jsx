import { useFieldArray, useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      users: [{ name: "", role: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const watchAll = watch("users");
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h3 className="text-center my-8 md:my-12 text-3xl md:text-4xl font-bold">
        Dynamic Form Handling
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-4 mb-4">
            <div className="flex flex-col flex-1">
              <input
                type="text"
                placeholder="Enter name"
                {...register(`users.${index}.name`, {
                  required: "Name is required",
                })}
                className="border px-2 py-1 rounded w-full"
              />
              {errors.users?.[index]?.name && (
                <span className="text-red-500 text-sm">
                  {errors.users[index].name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <select
                {...register(`users.${index}.role`, {
                  required: "Role is required",
                })}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
              {errors.users?.[index]?.role && (
                <span className="text-red-500 text-sm">
                  {errors.users[index].role.message}
                </span>
              )}
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>
        ))}

        {/* Add Button */}
        <button
          type="button"
          onClick={() => append({ name: "", role: "" })}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 cursor-pointer"
        >
          ➕ Add
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded ml-4 cursor-pointer"
        >
          Submit
        </button>
      </form>

      {/* Form State Preview */}
      <h3 className="mt-6 text-lg font-semibold">Form Data</h3>
      <table className="w-full mt-2 border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {watchAll.map((item, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;
