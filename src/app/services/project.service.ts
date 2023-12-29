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
