import { Factory, Building2, Hospital, Users } from 'lucide-react';

export const workflowSteps = [
    {
        id: 1,
        step: '01',
        title: 'Pharmaceutical Manufacturers',
        description: 'Quality medicines produced by trusted manufacturers following strict regulatory standards.',
        icon: Factory,
        bg: '#EFF6FF',
        color: '#2563EB',
    },
    {
        id: 2,
        step: '02',
        title: 'MEDYZIN',
        description: 'We bridge the gap between manufacturers and healthcare providers with strategic marketing & distribution.',
        icon: Building2,
        bg: '#ECFDF5',
        color: '#059669',
    },
    {
        id: 3,
        step: '03',
        title: 'Healthcare Providers',
        description: 'Hospitals, clinics, and pharmacies receive trusted medicines to prescribe and dispense with confidence.',
        icon: Hospital,
        bg: '#F5F3FF',
        color: '#7C3AED',
    },
    {
        id: 4,
        step: '04',
        title: 'Patients',
        description: 'Women and children receive safe, effective, and affordable medicines for better health outcomes.',
        icon: Users,
        bg: '#FFF1F2',
        color: '#E11D48',
    },
];
