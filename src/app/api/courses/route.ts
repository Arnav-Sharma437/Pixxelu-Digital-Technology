import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');

  // Hardcoded subset for now representing the MongoDB Course collection
  const courses = [
    {
      id: '1',
      category: 'Animation',
      title: 'Degree in Animation & VFX with AI',
      skills: 'Learn 2D & 3D Animation | Character Design | Modeling | Texturing | Lighting | Compositing | Cinematography',
      featured: true,
      badgeCode: 'ANI',
      placeholderImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Abstract / 3d render feel
    },
    {
      id: '2',
      category: 'Filmmaking',
      title: 'Filmmaking, Photography & Cinematography with AI',
      skills: 'Learn Direction | Script Writing | Cinematography | Editing | Production Wedding | Fashion | Product & Commercial Photography',
      featured: true,
      badgeCode: 'FILM',
      placeholderImage: 'https://images.unsplash.com/photo-1579165466991-467135ad3110?q=80&w=2670&auto=format&fit=crop', // Camera/film set feel
    },
    {
      id: '3',
      category: 'VFX',
      title: 'Video Editing, Motion Graphics & AI VFX Course',
      skills: 'Rotoscopy | Compositing | Green Screen | Motion Graphics | AI Video Editing | Runway ML | After Effects | Premiere Pro',
      featured: true,
      badgeCode: 'VFX',
      placeholderImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop', // Tech / screens feel
    },
    {
      id: '4',
      category: 'Digital Marketing',
      title: 'AI Digital Marketing & Content Creation Course',
      skills: 'Learn SEO | Google Ads | Social Media Marketing | Web Analytics | AI tools for content creation, video automation & growth hacking',
      featured: true,
      badgeCode: 'DM',
      placeholderImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2674&auto=format&fit=crop', // Laptop / digital strategy feel
    },
    {
      id: '5',
      category: 'Other',
      title: 'Some non-featured course',
      skills: '...',
      featured: false,
      badgeCode: 'OTH',
      placeholderImage: '',
    }
  ];

  if (featured === 'true') {
    return NextResponse.json(courses.filter(c => c.featured));
  }

  return NextResponse.json(courses);
}
