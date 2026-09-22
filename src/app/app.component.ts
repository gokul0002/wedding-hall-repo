import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuOpen = false;
  activeGallery = 'All';
  selectedImage: GalleryItem | null = null;
  submitted = false;

  gallery: GalleryItem[] = [
    { image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85', title: 'Grand Hall', category: 'Hall' },
    { image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85', title: 'Wedding Celebration', category: 'Wedding' },
    { image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85', title: 'Elegant Dining', category: 'Dining' },
    { image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85', title: 'Reception', category: 'Wedding' },
    { image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85', title: 'Dining Experience', category: 'Dining' },
    { image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=85', title: 'Conference Setup', category: 'Hall' }
  ];

  get filteredGallery(): GalleryItem[] {
    return this.activeGallery === 'All'
      ? this.gallery
      : this.gallery.filter(item => item.category === this.activeGallery);
  }

  scrollTo(id: string): void {
    this.menuOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openImage(item: GalleryItem): void {
    this.selectedImage = item;
  }

  closeImage(): void {
    this.selectedImage = null;
  }

submitEnquiry(): void {
  const form = document.querySelector('form');

  if (!form) {
    return;
  }

  const formData = new FormData(form);

  const name = String(formData.get('name') || '');
  const phone = String(formData.get('phone') || '');
  const date = String(formData.get('date') || '');
  const email = String(formData.get('email') || '');
  const message = String(formData.get('message') || '');

  const whatsappMessage = `
Hello Namma Kalyana Mandapam,

I would like to enquire about booking the venue.

Name: ${name}
Phone: ${phone}
Event Date: ${date || 'Not specified'}
Email: ${email || 'Not specified'}

Event Details:
${message || 'Not specified'}

Please share the availability and booking details.

Thank you.
  `.trim();

  const whatsappNumber = '8825796188';

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappUrl, '_blank');

  this.submitted = true;
}
}