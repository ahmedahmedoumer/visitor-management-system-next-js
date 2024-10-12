'use client';
import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { MdTitle } from 'react-icons/md';
import { classNames } from '@/utils/classNames';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

interface TextEditorProps {
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
  placeholder?: string;
}

const TextEditor: FC<TextEditorProps> = ({
  onChange,
  value = '',
  className = '',
  placeholder = '',
}) => {
  const [toolbar, setToolbar] = useState<any>(null);

  useEffect(() => {
    setToolbar({ container: '#textEditorToolbar' });
  }, []);

  return (
    <div
      className={classNames('border rounded-2xl border-gray-200', undefined, [
        className,
      ])}
    >
      <div
        id="textEditorToolbar"
        className="flex items-center gap-5 p-6 border-0 border-b border-gray-200"
      >
        <button className="ql-header" value="3">
          <MdTitle size={16} />
        </button>
        <button type="button" className="ql-bold"></button>
        <button type="button" className="ql-italic"></button>
        <button type="button" className="ql-underline"></button>
        <button type="button" className="ql-link"></button>
        <button type="button" className="ql-list" value="bullet"></button>
        <button type="button" className="ql-align" value="center"></button>
      </div>
      <div className="p-6 h-[250px] overflow-y-auto">
        {toolbar && (
          <QuillEditor
            modules={{
              toolbar,
            }}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
};

export default TextEditor;
