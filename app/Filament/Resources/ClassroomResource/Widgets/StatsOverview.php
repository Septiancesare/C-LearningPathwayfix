<?php

namespace App\Filament\Resources\ClassroomResource\Widgets;

use App\Models\Classroom;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make(label: 'Total Classroom', value: Classroom::count())
        ];
    }
}
