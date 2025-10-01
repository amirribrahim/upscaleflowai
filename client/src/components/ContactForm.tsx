import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react"; // ADD THIS IMPORT
import { Loader2, CheckCircle2 } from "lucide-react"; // ADD THIS IMPORT


const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email"),

  // Optional fields (no validation needed)
  companyName: z.string().optional(),
  phoneNumber: z.string().optional(),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      phoneNumber: "",
      notes: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
submit-automation
    method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitStatus("success");
        toast({
          title: "Form submitted successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        form.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
        toast({
          title: "Submission failed",
          description: data.message || "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      {/* Success/Error messages */}
      {submitStatus === "success" && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Message sent! We'll contact you soon.
        </div>
      )}
      {submitStatus === "error" && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Failed to send. Please try again.
        </div>
      )}

      <div
        className="rounded-lg p-6 sm:p-10 md:p-16 lg:p-20"
        style={{ background: "linear-gradient(to bottom, #3B82F6, black)" }}
      >
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold italic mb-6 sm:mb-8">
          Free Consultation
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Full name *"
                        {...field}
                        className="bg-white border-0 rounded-full h-10 sm:h-12 px-4 sm:px-6 placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email *"
                        type="email"
                        {...field}
                        className="bg-white border-0 rounded-full h-10 sm:h-12 px-4 sm:px-6 placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Company name *"
                        {...field}
                        className="bg-white border-0 rounded-full h-10 sm:h-12 px-4 sm:px-6 placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Phone number *"
                        {...field}
                        className="bg-white border-0 rounded-full h-10 sm:h-12 px-4 sm:px-6 placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Notes *"
                      {...field}
                      className="bg-white border-0 rounded-full h-10 sm:h-12 px-4 sm:px-6 placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="flex justify-center pt-2 sm:pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 sm:px-12 h-10 sm:h-12 font-medium disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};


export default ContactForm;