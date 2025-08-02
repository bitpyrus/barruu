# Barruu - Modern Publishing Platform

🧭 **Vision**: Barruu (meaning "writing" or "article" in Afan Oromo) is a modern storytelling platform where anyone can write, read, follow, and engage. Built as a fresh, flexible, and user-friendly alternative to Medium.

## 🎨 Design Philosophy

- **Typography-first**: Beautiful reading experience with perfect contrast and readability
- **Warm earth tones**: Terracotta, sage green, and warm neutrals for a welcoming feel
- **Mobile-first**: Responsive design that prioritizes mobile experience
- **Performance-focused**: Fast, smooth interactions with thoughtful animations

## ✨ Features

### Core Functionality
- ✅ **User Authentication**: Firebase Auth with email/password and social login
- ✅ **Rich Text Editor**: TipTap-powered editor with formatting, images, and links
- ✅ **Article Publishing**: Write, edit, and publish articles with tags
- ✅ **Content Discovery**: Explore feed with search and filtering
- ✅ **User Profiles**: Complete author profiles with follower system
- ✅ **Article Reading**: Clean, distraction-free reading experience
- ✅ **Social Features**: Like, comment, follow, and bookmark articles

### Design System
- ✅ **Semantic Color Tokens**: HSL-based design system with light/dark modes
- ✅ **Typography Scale**: Carefully crafted heading and body text styles
- ✅ **Component Variants**: Enhanced shadcn/ui components with custom variants
- ✅ **Responsive Layout**: Mobile-first responsive design
- ✅ **Smooth Animations**: Subtle hover effects and transitions

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **shadcn/ui** - High-quality, accessible UI components

### Rich Text Editing
- **TipTap** - Extensible rich text editor
- **TipTap Extensions** - Image, Link, and formatting support

### Backend (Ready for Firebase)
- **Firebase Auth** - User authentication and management
- **Firestore** - NoSQL database for articles, users, and comments
- **Firebase Storage** - File storage for images and media

### State Management
- **React Context** - Authentication state management
- **TanStack Query** - Server state management and caching

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase project (for backend functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd barruu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication, Firestore, and Storage
   - Copy your Firebase config and replace the demo config in `src/lib/firebase.ts`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:8080`

### Firebase Configuration

Update `src/lib/firebase.ts` with your Firebase project credentials:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── auth/           # Authentication components
│   ├── editor/         # Rich text editor components
│   ├── Header.tsx      # Main navigation
│   ├── Footer.tsx      # Footer component
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Write.tsx       # Article editor
│   ├── Explore.tsx     # Content discovery
│   ├── ArticleView.tsx # Article reading
│   ├── Profile.tsx     # User profiles
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/                # Utilities and config
│   ├── firebase.ts     # Firebase configuration
│   ├── utils.ts        # Utility functions
│   └── types.ts        # Type exports
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
└── ...
```

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core publishing platform
- ✅ User authentication
- ✅ Rich text editing
- ✅ Article discovery
- ✅ User profiles

### Phase 2 (Planned)
- 🔄 Firebase integration completion
- 🔄 Real-time comments
- 🔄 Push notifications
- 🔄 Advanced search
- 🔄 Article analytics

### Phase 3 (Future)
- 📋 PWA support
- 📋 Offline reading
- 📋 Email subscriptions
- 📋 Monetization features
- 📋 Mobile app (React Native)

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Design System

The project uses a comprehensive design system with:
- **Color palette**: Semantic HSL tokens for consistent theming
- **Typography**: Responsive heading and body text scales
- **Components**: Enhanced shadcn/ui components with custom variants
- **Animations**: Smooth transitions and hover effects

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Medium's clean reading experience
- Built with modern web technologies and best practices
- Design influenced by contemporary publishing platforms
- Typography inspired by traditional print media

---

**Built with ❤️ for writers and readers everywhere**