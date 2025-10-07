"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface DeleteSurveyModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  surveyName: string
}

export function DeleteSurveyModal({ open, onClose, onConfirm, surveyName }: DeleteSurveyModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">Delete Survey</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">This action cannot be undone</p>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete <span className="font-semibold">"{surveyName}"</span>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This will permanently remove the survey and all its associated data, including responses and analytics.
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-red-600 text-white hover:bg-red-700">
            Delete Survey
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
