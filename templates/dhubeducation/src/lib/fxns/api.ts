
import type { iBlog, iCampaign, iCourse, iFaq, iPartner, iService } from "$lib/interface";
import type { iResult } from "@toolsntuts/utils";
import { toast } from "svelte-sonner";

export const deleteServiceApi = async (category: iService) => {
  if (category) {
    try {
      const url = `/api/services/${category.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/services`;
        toast.success('Service deleted');
      }
    } catch (error: any) {
      console.log("deleteServiceApi()")
      toast.error('Make sure you remove fields using this service');
    }
  }
};

export const deleteCourseApi = async (course: iCourse) => {
  if (course) {
    try {
      const url = `/api/courses/${course.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/courses`;
        toast.success('course deleted');
      }
    } catch (error: any) {
      console.log("deleteCourseApi()")
    }
  }
};


export const deleteFaqApi = async (faq: iFaq) => {
  if (faq) {
    try {
      const url = `/api/faqs/${faq.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/faqs`;
        toast.success('course deleted');
      }
    } catch (error: any) {
      console.log("deleteFaqsApi()")
    }
  }
};
export const deleteBlogApi = async (blog: iBlog) => {
  if (blog) {
    try {
      const url = `/api/blogs/${blog.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/blogs`;
        toast.success('Blog deleted');
      }
    } catch (error: any) {
      console.log("deleteBlogApi()")
      toast.error('Make sure you remove fields using this blog');
    }
  }
};

export const deleteCampaignApi = async (campaign: iCampaign) => {
  if (campaign) {
    try {
      const url = `/api/campaigns/${campaign.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/campaigns`;
        toast.success('Campaign deleted');
      }
    } catch (error: any) {
      console.log("deleteCampaignApi()")
      toast.error('Make sure you remove fields using this campaign');
    }
  }
};

export const deletePartnerApi = async (partner: iPartner) => {
  if (partner) {
    try {
      const url = `/api/partners/${partner.xata_id}`;

      const options: RequestInit = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);
      const { status, message } = (await response.json()) as iResult;

      if (status === 'error') {
        toast.error(message);
      } else {
        location.href = `/admin/partners`;
        toast.success('Partner deleted');
      }
    } catch (error: any) {
      console.log("deletePartnerApi()")
      toast.error('Make sure you remove fields using this partner');
    }
  }
};