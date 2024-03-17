'use client'
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import Image from 'next/image';


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Dropdown from './Dropdown';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { useUploadThing } from '@/lib/uploadthing';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from '../ui/use-toast';

import { CalendarIcon } from 'lucide-react';


//const { startUpload } = useUploadThing("imageUploader");
import {format } from 'date-fns';


import { FileUploader } from './FileUploader';
import clsx from 'clsx';
import { createEvent } from '@/lib/actions/event.action';
import { useRouter } from 'next/navigation';



const formSchema = z.object({
  title: z.string().trim().min(3, 'title must be 3 chracters'),
  category: z.string(),
  tags: z.array(z.string().min(2, 
    {message: 'Tag must be atleast 2 characters'})).min(1, 
      {message: 'At least one tag is required'}),
  description: z.string().trim().min(2, 
    {message:'At least 2 characters must be in description'}).max(400, 
      { message: 'Maximum 400 characters can be in description'}),
  photo: z.string(),
  isOnline: z.boolean().optional(),
  location: z.string().trim().optional(),
  landmark: z.string().trim().optional(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  duration: z.string().trim().optional(),
  totalCapacity: z.string().trim().optional(),
  isFree: z.boolean(),
  price: z.string().trim().optional(),
  ageRestriction: z.string().trim().optional(),
  url: z.string().trim().optional()
})


interface props {
    userId: string,
    type: 'Create' | 'Update'
}


const EventForm = (props: props) => {
  
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: undefined,
      tags: [],
      description: '',
      photo: undefined,
      isOnline: false,
      location: '',
      landmark: '',
      startDate: undefined,
      endDate: undefined,
      duration: undefined,
      totalCapacity: undefined,
      isFree: false,
      price: undefined,
      ageRestriction: undefined,
      url: ''
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    let uploadedImageUrl = values.photo;
    
    try {
      
      if(files.length > 0){
        const uploadedImages = await startUpload(files);
        if (!uploadedImages) {
          throw new Error("Please upload a valid image below of 4MB.");
        }

        uploadedImageUrl = uploadedImages[0].url;
      }
      
      const newEvent  = await createEvent({
        title: values.title,
        category: values.category,
        description: values.description,
        photo: uploadedImageUrl,
        isOnline: values.isOnline,
        location: values.location,
        landmark: values.landmark,
        startDate: values.startDate,
        endDate: values.endDate,
        startTime: values.startTime,
        endTime: values.endTime,
        duration:
          values.duration === undefined ? values.duration : +values.duration,
        // isMultipleDays: values.isMultipleDays ,
        totalCapacity:
          values.totalCapacity === undefined
            ? values.totalCapacity
            : +values.totalCapacity,
        isFree: values.isFree,
        price: values.price === undefined ? values.price : +values.price,
        tags: values.tags,
        ageRestriction:
          values.ageRestriction === undefined
            ? values.ageRestriction
            : +values.ageRestriction,
        url: values.url,
        organizer: props.userId,
      });

      form.reset();

      router.push(`/event/${newEvent._id}`);
      
      toast({
        title: 'Success',
        description: `Event ${props.type === 'Update' ? 'updated' : 'created'} successfully`
      });

    } catch (error : any) {
      toast({
        variant: 'destructive',
        title: 'Something wen wrong',
        description: error.message
      });
    } finally {
      setSubmitting(false);
    }

    
  }
  
  const handleKeyDown = (e: any, field: any) => {
      if(
        (e.key === 'Enter' && field.name === 'tags') || 
        ( e.key === ',' && field.name === 'tags')
        ){
          e.preventDefault();
          const tagInput = e.target;
          const tagValue = e.target.value.trim().toLowerCase();

          if(tagValue.length > 15){
            return (form.setError('tags', {
              type: 'required',
              message: 'Max length should not exceed 15 characters'
            }));
          }
          if(tagValue.length === 0){
            return (form.setError('tags', {
              type: 'required',
              message: 'Please add tag'
            }));
          }
          if(!field.value.includes(tagValue)){
            form.setValue('tags', [...field.value, tagValue]);
            tagInput.value = '';
            form.clearErrors('tags');
          } else {
            form.setError("tags", {
              type: "validate",
              message: "Alredy exist",
            });
            form.trigger('tags');
          }

         
        }
      
  }

  const removeTag = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => {
      return (t !== tag)
    })
    form.setValue('tags', newTags);  
  }
  return (
    <div>
      <h1 className="text-4xl max-sm:text-2xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent mb-5 mt-5">
        {`${props.type} Event`}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white-300 pt-10 max-sm:pt-4">
          <div className='flex justify-around items-center gap-10 max-sm:flex-col'>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Title <span className="text-red-700">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Write a catchy title for your event" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category <span className="text-red-700">*</span></FormLabel>
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value}/>
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Tags <span className="text-red-700">*</span></FormLabel>
                <FormControl>
                  <>
                    <Textarea 
                      onKeyDown={(e) => handleKeyDown(e, field)}
                      className='min-h-min'
                    />
                    {
                      field.value.length > 0 && (
                        <div className='flex items-center justify-start gap-2 flex-wrap uppercase'>
                          {field.value.map((tag, idx) => {
                            return (
                              <Badge className=''>
                                {tag}
                                <Image
                                  src='/assets/images/close.svg'
                                  alt='close'
                                  width={12}
                                  height={12}
                                  className='ml-1 hover:cursor-pointer'
                                  onClick={() => removeTag(tag, field)}
                                />
                              </Badge>
                            )
                            })
                          }
                      </div>
                      )
                    }
                  </>
                </FormControl>
                <FormDescription>Add atleast 1 tag to describe what your event is about. You need to press enter or comma "," to add a tag.</FormDescription>
                <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex gap-10 max-sm:flex-col'>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Description <span className="text-red-700">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      className='h-72 max-sm:h-auto' 
                      placeholder="Write a description of event details." {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Photo <span className="text-red-700">*</span></FormLabel>
                  <FormControl>
                    <FileUploader 
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="isOnline"
                render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Is Online?</FormLabel>
                  <FormControl> 
                    <Checkbox
                      className='ml-2'
                      onCheckedChange={field.onChange}
                      checked={field.value}

                    />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
                )}
              />
              {!form.getValues().isOnline && 
                <div className=''>
                   <div className='flex justify-around items-center gap-10 max-sm:flex-col mt-4'>
                   <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="The location of the event."  {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                    )}
                  />

                    <FormField
                      control={form.control}
                      name="landmark"
                      render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Landmark</FormLabel>
                        <FormControl>
                          <Input placeholder="The landmark of the event" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                      )}
                    />
                    </div>
                    <div className='flex justify-around items-center gap-10 max-sm:flex-col mt-4'>
                      <FormField
                        control={form.control}
                        name="totalCapacity"
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>
                              Total sitting Capacity of venue{" "}
                              {/* <span className="text-red-700">*</span> */}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Capacity of the venue"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                    </div>
                </div>
              }
            </div>
            <div className='flex gap-10 max-sm:flex-col'>
               <div className='flex w-1/2 gap-4 max-md:flex-wrap mt-2'>
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                    <FormItem className='w-full flex flex-col '>
                        <FormLabel>
                          Start Date <span className="text-red-700">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                className={clsx("w-auto pl-3 text-left font-normal pt-2",
                                !field.value && "text-muted-foreground")}
                              >
                                {!field.value ? <span>Pick a date</span>   :
                                  format(field.value, 'PPP')
                                 }
                                <CalendarIcon className='h-4 w-4 opacity-50 ml-auto'/>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                          </PopoverContent>
                        </Popover>
                      <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                    <FormItem className='w-full flex flex-col'>
                      <FormLabel>End Date <span className="text-red-700">*</span></FormLabel>
                      <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                className={clsx("w-auto pl-3 text-left font-normal pt-2",
                                !field.value && "text-muted-foreground")}
                              >
                                {!field.value ? <span>Pick a date</span>   :
                                  format(field.value, 'PPP')
                                 }
                                <CalendarIcon className='h-4 w-4 opacity-50 ml-auto'/>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                          </PopoverContent>
                        </Popover>
                      <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                  <div className='flex w-1/2 gap-4 max-sm:flex-col max-md:flex-wrap'> 
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem className='w-auto'>
                          <FormLabel>
                            Start Time <span className="text-red-700">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="time" id="startTime" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                      <FormItem className='w-auto'>
                        <FormLabel>End Time <span className="text-red-700">*</span></FormLabel>
                        <FormControl>
                          <Input type="time" id="endTime" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                      <FormItem className='w-auto'>
                        <FormLabel>Duration (Minutes)</FormLabel>
                        <FormControl>
                          <Input placeholder={"Duration..."}  {...field} />
                          {/* <div className='border rounded-md'>hello</div> */}
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> 
                  
            </div>
            <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Is Free?</FormLabel>
                    <FormControl> 
                      <Checkbox
                        className='ml-2'
                        onCheckedChange={field.onChange}
                        checked={field.value}

                      />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                  )}
                />
            <div className='flex max-md:flex-col gap-10'>
              <div className='flex max-md:flex-col w-1/2 gap-4'>
                { !form.getValues().isFree && 
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel>
                            Price
                            {/* <span className="text-red-700">*</span> */}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Price in INR"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                  }
              </div>
              <div className='flex max-md:flex-col w-1/2 gap-4'>
                
                <FormField
                  control={form.control}
                  name="ageRestriction"
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Age restriction
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Minimum age required to attend the event."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
                
              </div>
            </div> 
            <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Event URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Url of the event."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
            <div className="flex justify-center items-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? props.type === "Update"
                    ? "Updating..."
                    : "Creating..."
                  : props.type === "Update"
                  ? "Update Event"
                  : "Create Event"}
              </Button>
            </div>
          
        </form>
      </Form>
    </div>
  )
}

export default EventForm;
