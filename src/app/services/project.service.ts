import { TrackedProject } from '@/app/types';

export const fetchUserDashboard = async (
  accessToken: string,
): Promise<TrackedProject[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/project/dashboard`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export const trackProject = async (
  projectData: { name: string; description: string; price: number },
  accessToken: string,
): Promise<TrackedProject> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/project/track`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to track project');
    }

    const project = await response.json();
    return project;
  } catch (error) {
    console.error('Error tracking project:', error);
    throw error;
  }
};
