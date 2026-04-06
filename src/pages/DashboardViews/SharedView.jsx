import React from 'react';
import { Share2 } from 'lucide-react';

function SharedView() {
  return (
    <div className="animate-fade-in h-full flex flex-col items-center justify-center text-center mt-16">
      <div className="feature-icon bg-blue mb-4">
        <Share2 size={32} color="var(--primary-color)" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Shared Files</h2>
      <p className="text-muted max-w-md mx-auto">
        When you generate a share link for a file, it can be accessed by anyone with the link.
        Access your files through the "My Files" tab and click the Share icon to generate a link.
      </p>
    </div>
  );
}

export default SharedView;
