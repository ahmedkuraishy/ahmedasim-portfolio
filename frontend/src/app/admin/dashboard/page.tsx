'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// Import Components
import Sidebar from '@/components/Admin/Sidebar';
import Header from '@/components/Admin/Header';
import AboutForm from '@/components/Admin/AboutForm';
import NavbarForm from '@/components/Admin/NavbarForm';
import HeroForm from '@/components/Admin/HeroForm';
import SkillsForm from '@/components/Admin/SkillsForm';
import ServicesForm from '@/components/Admin/ServicesForm';
import ProjectsForm from '@/components/Admin/ProjectsForm';
import BlogForm from '@/components/Admin/BlogForm';
import ContactForm from '@/components/Admin/ContactForm';
import FooterForm from '@/components/Admin/FooterForm';
import CountersForm from '@/components/Admin/CountersForm';
import UsersTable from '@/components/Admin/UsersTable';
import UserForm from '@/components/Admin/UserForm';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

type TabType = 'about' | 'navbar' | 'hero' | 'counters' | 'skills' | 'services' | 'projects' | 'blog' | 'contact' | 'footer' | 'users';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('navbar');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // User Management State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (!storedToken) {
      router.push('/admin/login');
      return;
    }
    setToken(storedToken);
    fetchData(storedToken);
  }, []);

  const fetchData = async (authToken: string) => {
    try {
      const usersRes = await fetch('http://localhost:5000/api/users', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (usersRes.ok) setUsers(await usersRes.json());

      const portRes = await fetch('http://localhost:5000/api/portfolio');
      if (portRes.ok) setPortfolioData(await portRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSection = async (section: string, data: any) => {
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch('http://localhost:5000/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...portfolioData, [section]: data }),
      });

      if (res.ok) {
        const newData = await res.json();
        setPortfolioData(newData);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`,
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#9333ea'
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);

    const formData = new FormData(e.target as HTMLFormElement);
    let imageUrl = portfolioData.about.image;

    if (selectedFile) {
      const uploadFormData = new FormData();
      uploadFormData.append('image', selectedFile);
      
      try {
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: uploadFormData
        });
        if (uploadRes.ok) {
          const { imageUrl: newUrl } = await uploadRes.json();
          imageUrl = newUrl;
        }
      } catch (err) {
        console.error('Image upload failed', err);
      }
    }

    const updatedAbout = {
      ...portfolioData.about,
      heading: formData.get('heading'),
      subheading: formData.get('subheading'),
      image: imageUrl,
      name: formData.get('name'),
      email: formData.get('email'),
      dob: formData.get('dob'),
      address: formData.get('address'),
      zip: formData.get('zip'),
      phone: formData.get('phone'),
      description: formData.get('description'),
    };

    try {
      const res = await fetch('http://localhost:5000/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...portfolioData, about: updatedAbout }),
      });

      if (res.ok) {
        setPortfolioData(await res.json());
        setSelectedFile(null);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'About section updated successfully!',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#9333ea'
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateHero = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedHero = portfolioData.hero.map((_: any, idx: number) => ({
      subheading: formData.get(`hero_sub_${idx}`),
      title: formData.get(`hero_title_${idx}`),
      bgImage: formData.get(`hero_img_${idx}`),
    }));
    handleUpdateSection('hero', updatedHero);
  };

  const handleUpdateNavbar = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedNavbar = portfolioData.navbar.map((_: any, idx: number) => ({
      name: formData.get(`nav_name_${idx}`),
      url: formData.get(`nav_url_${idx}`),
    }));
    handleUpdateSection('navbar', updatedNavbar);
  };

  const handleUpdateSkills = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedSkills = portfolioData.skills.map((_: any, idx: number) => ({
      name: formData.get(`skill_name_${idx}`),
      value: parseInt(formData.get(`skill_value_${idx}`) as string),
    }));
    handleUpdateSection('skills', updatedSkills);
  };

  const handleUpdateServices = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedServices = portfolioData.services.map((_: any, idx: number) => ({
      title: formData.get(`service_title_${idx}`),
      icon: formData.get(`service_icon_${idx}`),
      description: formData.get(`service_desc_${idx}`),
    }));
    handleUpdateSection('services', updatedServices);
  };

  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedContact = {
      subheading: formData.get('contact_sub'),
      title: formData.get('contact_title'),
      description: formData.get('contact_desc'),
      address: formData.get('contact_addr'),
      phone: formData.get('contact_phone'),
      email: formData.get('contact_email'),
      website: formData.get('contact_web'),
    };
    handleUpdateSection('contact', updatedContact);
  };

  const handleUpdateProjects = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedProjects = portfolioData.projects.map((_: any, idx: number) => ({
      title: formData.get(`project_title_${idx}`),
      category: formData.get(`project_cat_${idx}`),
      image: formData.get(`project_img_${idx}`),
    }));
    handleUpdateSection('projects', updatedProjects);
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedBlog = portfolioData.blog.map((_: any, idx: number) => ({
      title: formData.get(`blog_title_${idx}`),
      date: formData.get(`blog_date_${idx}`),
      author: formData.get(`blog_author_${idx}`),
      image: formData.get(`blog_img_${idx}`),
      excerpt: formData.get(`blog_excerpt_${idx}`),
    }));
    handleUpdateSection('blog', updatedBlog);
  };

  const handleUpdateFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedFooter = {
      ...portfolioData.footer,
      about: {
        title: formData.get('footer_about_title'),
        text: formData.get('footer_about_text'),
      },
      copyright: formData.get('footer_copy'),
    };
    handleUpdateSection('footer', updatedFooter);
  };

  const handleUpdateCounters = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedCounters = portfolioData.counters.map((_: any, idx: number) => ({
      label: formData.get(`counter_label_${idx}`),
      number: parseInt(formData.get(`counter_val_${idx}`) as string),
      icon: formData.get(`counter_icon_${idx}`),
    }));
    handleUpdateSection('counters', updatedCounters);
  };

  const getTabLabel = (id: TabType) => {
    const labels: Record<TabType, string> = {
      navbar: 'Navbar',
      hero: 'Hero Section',
      counters: 'Stats Counters',
      about: 'About Me',
      skills: 'Skills',
      services: 'Services',
      projects: 'Projects',
      blog: 'Blog Posts',
      contact: 'Contact Info',
      footer: 'Footer',
      users: 'User Management'
    };
    return labels[id];
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleDeleteUser = async (id: string) => {
    if (!token) return;
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: '#1a1a1a',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setUsers(users.filter(u => u._id !== id));
          Swal.fire({
            title: 'Deleted!',
            text: 'User has been deleted.',
            icon: 'success',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#9333ea'
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Delete failed',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#9333ea'
        });
      }
    }
  };

  const handleSaveUser = async (userData: User) => {
    if (!token) return;
    
    try {
      const url = userData._id 
        ? `http://localhost:5000/api/users/${userData._id}` 
        : 'http://localhost:5000/api/users';
      
      const method = userData._id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        // Refresh users list
        fetchData(token);
        
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `User ${userData._id ? 'updated' : 'created'} successfully!`,
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#9333ea'
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save user');
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Error saving user',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#9333ea'
      });
      throw err; // Re-throw to be caught by the form
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Initializing Secure Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      <main className="main-content">
        <Header 
          title={getTabLabel(activeTab)} 
          subtitle={activeTab === 'users' ? 'Manage administrative access' : `Update your ${getTabLabel(activeTab)} content`}
          onRefresh={() => fetchData(token || '')}
          showAddUser={activeTab === 'users'}
          onAddUser={() => {
            setEditingUser(null);
            setIsUserModalOpen(true);
          }}
        />

        <div className="content-area">
          {activeTab === 'users' ? (
            <UsersTable 
              users={users} 
              onDelete={handleDeleteUser}
              onEdit={(user) => {
                setEditingUser(user);
                setIsUserModalOpen(true);
              }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {activeTab === 'navbar' && <NavbarForm data={portfolioData?.navbar} saving={saving} onUpdate={handleUpdateNavbar} />}
              {activeTab === 'hero' && <HeroForm data={portfolioData?.hero} saving={saving} onUpdate={handleUpdateHero} />}
              {activeTab === 'counters' && <CountersForm data={portfolioData?.counters} saving={saving} onUpdate={handleUpdateCounters} />}
              {activeTab === 'about' && (
                <AboutForm 
                  data={portfolioData?.about} 
                  saving={saving} 
                  onUpdate={handleUpdateAbout} 
                  selectedFile={selectedFile} 
                  setSelectedFile={setSelectedFile} 
                />
              )}
              {activeTab === 'skills' && <SkillsForm data={portfolioData?.skills} saving={saving} onUpdate={handleUpdateSkills} />}
              {activeTab === 'services' && <ServicesForm data={portfolioData?.services} saving={saving} onUpdate={handleUpdateServices} />}
              {activeTab === 'projects' && <ProjectsForm data={portfolioData?.projects} saving={saving} onUpdate={handleUpdateProjects} />}
              {activeTab === 'blog' && <BlogForm data={portfolioData?.blog} saving={saving} onUpdate={handleUpdateBlog} />}
              {activeTab === 'contact' && <ContactForm data={portfolioData?.contact} saving={saving} onUpdate={handleUpdateContact} />}
              {activeTab === 'footer' && <FooterForm data={portfolioData?.footer} saving={saving} onUpdate={handleUpdateFooter} />}

              {/* General placeholder for truly unbuilt sections */}
              {!['about', 'hero', 'navbar', 'skills', 'services', 'contact', 'projects', 'blog', 'footer', 'counters', 'users'].includes(activeTab) && (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗️</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{getTabLabel(activeTab)} Editor</h3>
                  <p style={{ color: '#9ca3af' }}>The interface for this section is currently being built.</p>
                </div>
              )}
            </div>
          )}
        </div>

      </main>

      <UserForm 
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={editingUser}
        onSave={handleSaveUser}
      />
    </div>
  );
}
