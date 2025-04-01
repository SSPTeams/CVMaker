from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Resume
from .serializers import ResumeSerializer, ResumeCreateSerializer

class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create':
            return ResumeCreateSerializer
        return ResumeSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def generate_pdf(self, request, pk=None):
        resume = self.get_object()
        # TODO: Implement PDF generation
        return Response({'message': 'PDF generation not implemented yet'})

    @action(detail=True, methods=['post'])
    def share(self, request, pk=None):
        resume = self.get_object()
        # TODO: Implement sharing functionality
        return Response({'message': 'Sharing not implemented yet'})