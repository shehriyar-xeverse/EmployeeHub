import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  X,
  User,
  Mail,
  Building2,
  DollarSign,
  Upload,
  User2Icon,
  Pencil,
} from "lucide-react";
import { EmployeeForm } from "@/types/employee";
import { toast } from "sonner";

const CreateEmployeeReq = ({
  setIsModalOpen,
  onSuccess,
  addEmployeeReq,
  isLoading,
  data,
}: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [file, setFile] = useState<null | File>(null);

  const Id = data?.data?.id;
  const userEmail = data?.data?.email;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EmployeeForm>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return toast.error("Please upload an image file");
    if (file.size > 2 * 1024 * 1024)
      return toast.error("Image size should be less than 2MB");

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setValue("employee_image", e.target.files);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue("employee_image", null as any);
  };

  const fileOnChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = e.target.files[0];
      setFile(selectedFiles);
    }
  };

  const onSubmit = async (data: EmployeeForm) => {
    try {
      if (userEmail !== data.email) {
        toast.error("User email & Employee email does not match", {
          position: "top-center",
        });
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("department", data.department);
      formData.append("salary", data.salary.toString());
      formData.append("employee_image", imageFile!);
      formData.append("created_by_id", Id);
      if (file) {
        formData.append("file", file);
      }
      await addEmployeeReq(formData).unwrap();
      reset();
      removeImage();
      setIsModalOpen(false);
      onSuccess?.();
      toast.success("Employee Request Successfully Created!", {
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Employee Request Failed!", {
        position: "top-center",
      });
    }
  };

  const employeeImage = register("employee_image");
  const employeeFile = register("employee_file");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-800/50">
          <div>
            <h2 className="text-2xl font-bold  text-teal-700  ">
              Create Employee Request
            </h2>
            <p className="text-sm text-gray-400">
              Fill in the details for employee request{" "}
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="p-2 hover:bg-gray-800/50 rounded-xl"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </Button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 space-y-4 max-h-[calc(90vh-130px)] overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-400" />
                Full Name *
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2.5 bg-[#0a0a0a] border ${
                  errors.name ? "border-red-500" : "border-gray-700/50"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                Email Address *
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "Only Gmail addresses are allowed",
                  },
                })}
                className={`w-full px-4 py-2.5 bg-[#0a0a0a] border ${
                  errors.email ? "border-red-500" : "border-gray-700/50"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50`}
                placeholder="john@gmail.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-400" />
                Department *
              </label>
              <select
                {...register("department", {
                  required: "Department is required",
                })}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="">Select Department</option>
                {[
                  "Engineering",
                  "Marketing",
                  "Sales",
                  "HR",
                  "Finance",
                  "Design",
                  "Operations",
                ].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-teal-400" />
                Salary (USD) *
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                {...register("salary", {
                  required: "Salary is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Salary must be positive" },
                })}
                className={`w-full px-4 py-2.5 bg-[#0a0a0a] border ${
                  errors.salary ? "border-red-500" : "border-gray-700/50"
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50`}
                placeholder="60000"
              />
              {errors.salary && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.salary.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User2Icon className="w-4 h-4 text-teal-400" />
                Employee Image *
              </label>

              {imagePreview ? (
                <div className="relative group">
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-teal-500/30 bg-[#0a0a0a]">
                    <img
                      src={imagePreview}
                      alt="Employee"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <label className="cursor-pointer p-2.5 bg-teal-600/90 hover:bg-teal-700 rounded-xl transition-all hover:scale-110">
                        <Pencil className="w-5 h-5 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          {...employeeImage}
                          onChange={(e) => {
                            employeeImage.onChange(e);
                            handleImageChange(e);
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-2.5 bg-red-600/90 hover:bg-red-700 rounded-xl transition-all hover:scale-110"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Upload Area
                <label className="flex flex-col items-center justify-center w-full h-40   border-gray-700 hover:border-teal-500 rounded-xl bg-[#0a0a0a] hover:bg-[#111] transition-all cursor-pointer group">
                  <div className="p-3.5 bg-teal-500/10 rounded-full group-hover:bg-teal-500/20 transition-all">
                    <Upload className="w-8 h-8 text-teal-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-gray-300 group-hover:text-teal-400 transition-colors">
                    Click to upload employee image
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...employeeImage}
                    onChange={(e) => {
                      employeeImage.onChange(e);
                      handleImageChange(e);
                    }}
                  />
                </label>
              )}
              {errors.employee_image && (
                <p className="text-red-400 text-xs mt-1">
                  Employee Image is Required
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User2Icon className="w-4 h-4 text-teal-400" />
                Employee Resume *
              </label>

              <label className="flex flex-col items-center justify-center w-full h-40   border-gray-700 hover:border-teal-500 rounded-xl bg-[#0a0a0a] hover:bg-[#111] transition-all cursor-pointer group">
                <div className="p-3.5 bg-teal-500/10 rounded-full group-hover:bg-teal-500/20 transition-all">
                  <Upload className="w-8 h-8 text-teal-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="mt-3 text-sm font-medium text-gray-300 group-hover:text-teal-400 transition-colors">
                  Click to upload employee resume
                </p>

                <input
                  {...employeeFile}
                  onChange={(e) => {
                    employeeFile.onChange(e);
                    fileOnChnage(e);
                  }}
                  type="file"
                  accept=".pdf, .doc, .docx, .xls, .xlsx"
                  className="hidden"
                />
              </label>
              {errors.employee_file && (
                <p className="text-red-400 text-xs mt-1">
                  Employee Resumen is Required
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2 border-t border-gray-800/50">
            <Button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                removeImage();
              }}
              className="flex-1 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-gray-300 font-medium h-12  cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 rounded-xl text-white font-medium shadow-lg shadow-teal-500/20 disabled:opacity-50 flex items-center justify-center gap-2 h-12  cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Adding...
                </>
              ) : (
                "Create Request"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default   React.memo(CreateEmployeeReq) ;
