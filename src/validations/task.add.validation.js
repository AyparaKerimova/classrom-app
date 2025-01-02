import * as Yup from "yup";

export const addTaskSchema =  Yup.object({
      title: Yup.string().required("Task title is required"),
      description: Yup.string().required("Task description is required"),
      topic: Yup.string().required("Topic is required"),
      deadline: Yup.date()
        .min(new Date(), "Deadline cannot be in the past")
        .required("Deadline is required"),
    })